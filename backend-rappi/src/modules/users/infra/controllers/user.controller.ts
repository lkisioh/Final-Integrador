import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository, // ✅ se inyecta por token, no por clase
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute(dto);
  }
  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
}