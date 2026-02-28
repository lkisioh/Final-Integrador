import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param, //seguridad debajo
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserService } from '../../application/services/user.service';
import { AddressDto } from '../../application/dtos/address.dto';

// para seguridad

import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/application/decorators/public.decorator';
import { FinalUserOwnershipGuard } from 'src/modules/auth/application/guards/final-user-ownership.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // crear no necesira restricción, no usa jwt
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard) // todos protegidos, salvo create-post
  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string, @Req() req: any) {
    return await this.userService.getByUuid(uuid);
  }

  // ADMIN - no debería estar esto solo admin ve lista completa
  /* @Get()
  async findAll() {
    const users = await this.userService.getAllUsers();
    return users;
  }*/
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(uuid, dto);
  }
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard)
  @Post(':uuid/addresses')
  async postAddress(@Param('uuid') uuid: string, @Body() dto: AddressDto) {
    return await this.userService.postAddress(uuid, dto);
  }
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard)
  @Patch(':uuid/addresses/:addressUuid')
  async updateAddress(
    @Param('uuid') userUuid: string,
    @Param('addressUuid') addressUuid: string,
    @Body() dto: AddressDto,
  ) {
    return await this.userService.updateAddress(userUuid, addressUuid, dto);
  }
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard)
  @Delete(':uuid/addresses/:addressUuid')
  async deleteAddress(
    @Param('uuid') userUuid: string,
    @Param('addressUuid') addressUuid: string,
  ) {
    return await this.userService.deleteAddress(userUuid, addressUuid);
  }
  @UseGuards(JwtAuthGuard, FinalUserOwnershipGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return await this.userService.delete(uuid);
  }
}
