import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserOrmEntity } from '../../infra/databases/user.orm-entity';
import { AddressOrmEntity } from '../../infra/databases/address.orm-entity';
import { OrderOrmEntity } from '../../../orders/infra/databases/order.orm-entity';
import { DriverOrmEntity } from '../../../drivers/infra/databases/driver.orm-entity';
import { VendorOrmEntity } from '../../../vendors/infra/databases/vendor.orm-entity';
import { ProductOrmEntity } from '../../../products/infra/databases/product.orm-entity';
import { OrderItemOrmEntity } from '../../../orders/infra/databases/order-item.orm-entity';
import { UserRepositoryImpl } from '../../infra/repositories/user.repository.impl';
import { USER_REPO } from '../../domain/repositories/user.repository.interface';

jest.mock('uuid', () => ({
  v4: () => 'mock-uuid-123',
}));

describe('User Integration', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../../../../**/*.orm-entity.{ts,js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserOrmEntity, AddressOrmEntity, OrderOrmEntity, DriverOrmEntity, VendorOrmEntity, ProductOrmEntity, OrderItemOrmEntity]),
      ],
      providers: [
        UserService,
        { provide: USER_REPO, useClass: UserRepositoryImpl },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  },15000);

  it('debería persistir un usuario en la DB de prueba', async () => {
    const dto = { name: 'Test DB', email: 'db@test.com', password: '123', addresses: [] };
    const saved = await service.create(dto);
    
    expect(saved.uuid).toBeDefined();
  });
});