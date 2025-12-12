import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserService } from '../../application/services/user.service';
import { AddressDto } from '../../application/dtos/address.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return user;
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const user = await this.userService.getByUuid(uuid);
    return user;
  }

  @Get()
  async findAll() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(uuid, dto);
    return user;
  }

  @Post(':uuid/addresses')
  async postAddress(@Param('uuid') uuid: string, @Body() dto: AddressDto) {
    const user = await this.userService.postAddress(uuid, dto);
    return user;
  }
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    const result = await this.userService.delete(uuid);
    return result;
  }
}
