import { Injectable, Inject } from '@nestjs/common';
import { USER_REPO } from '../../domain/repositories/user.repository.interface';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getByUuid(uuid: string) {
    return this.userRepository.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateUserDto) {
    return this.userRepository.update(dto, uuid);
  }

  async delete(uuid: string) {
    await this.userRepository.delete(uuid);
    return { message: 'User deleted successfully' };
  }
  async postAddress(uuid: string, dto: any) {
    return this.userRepository.postAddress(dto, uuid);
  }
}
