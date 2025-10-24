import { Controller,Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto | null> {
    return this.userService.create(createUserDto);
  }
}