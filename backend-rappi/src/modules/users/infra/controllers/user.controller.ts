import { Controller, Post, Body, Get, Inject, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
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
  @Get('by-uuid/:uuid')
  async findByUuid(@Body('uuid') uuid: string) {
    const user = await this.userRepository.findByUuid(uuid);
    return user;
  }
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto) {
    const user = await this.userRepository.update({ ...dto }, uuid);
    return user;
  }
  @Delete(':uuid')
  async delete(@Body('uuid') uuid: string) {
    await this.userRepository.delete(uuid);
    return { message: 'User deleted successfully' };
  }
}
