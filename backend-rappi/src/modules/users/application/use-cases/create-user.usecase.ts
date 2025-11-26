import { Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.addresses = user.addresses ?? [];

    return await this.userRepo.createUser(user);
  }
}
