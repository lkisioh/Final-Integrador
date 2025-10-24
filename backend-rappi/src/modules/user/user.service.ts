import { Injectable, Inject } from '@nestjs/common';

import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

// casos de usos externos
import { FindUsersUseCase } from '../../application/use-cases/find-users.usecase';
import { CreateUsersUseCase } from 'src/application/use-cases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly createUsersUseCase: CreateUsersUseCase,
    
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  getAllUsers() {
    return this.findUsersUseCase.execute();
  }

  create(createUserDto){
    return this.createUsersUseCase.execute(createUserDto);
  }
}