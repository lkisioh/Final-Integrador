import { Injectable, Inject } from '@nestjs/common';

import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(
    
    private readonly createUserUseCase: CreateUserUseCase,
    
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  create(createUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  getAllUsers() {
    return this.userRepository.findAll();
  }
}