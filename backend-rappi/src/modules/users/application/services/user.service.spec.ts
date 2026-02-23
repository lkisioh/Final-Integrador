import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USER_REPO } from '../../domain/repositories/user.repository.interface';

describe('UserService (Unit)', () => {
  let service: UserService;

  const mockRepo = {
    createUser: jest.fn().mockImplementation((dto) => Promise.resolve({
      uuid: '123-uuid',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPO, 
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('debería crear un usuario correctamente', async () => {
    const dto = { name: 'Juan', email: 'juan@test.com', password: '123', addresses: [] };
    const result = await service.create(dto);

    expect(result).toHaveProperty('uuid');
    expect(result.name).toBe('Juan');
    expect(mockRepo.createUser).toHaveBeenCalled();
  });
});