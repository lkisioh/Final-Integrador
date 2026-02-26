import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param, //seguridad debajo
  UseGuards,
  ForbiddenException, //ParseUUIDPipe sin bcrypt es al pedo por ahora
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserService } from '../../application/services/user.service';
import { AddressDto } from '../../application/dtos/address.dto';

// para seguridad

import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { ActorType } from 'src/modules/auth/application/types/types';
import { ActorTypesGuard } from 'src/modules/auth/application/guards/actor-types.guard';
import { ActorTypes } from 'src/modules/auth/application/types/actor-types.decorator';

@UseGuards(JwtAuthGuard, ActorTypesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return user;
  }
  /** 



@Controller('products')
export class ProductsController {

  @Post(':vendorUuid')
  @ActorTypes('vendor')
  async create(
    @Param('vendorUuid', new ParseUUIDPipe()) vendorUuid: string,
    @Body() dto: CreateProductDto,
    @Req() req: any,
  ) {
    
    if (req.user.uuid !== vendorUuid) {
      throw new ForbiddenException('No podés crear productos para otro vendor');
    }

    return this.createProductUseCase.execute(dto, vendorUuid);
  }
}*/
  @Get(':uuid')
  @ActorTypes('final-user')
  async findByUuid(@Param('uuid') uuid: string, @Req() req: any) {
    // el logueado solo ve el suyo

    if (req.user.uuid !== uuid) {
      throw new ForbiddenException('No podés ver un usuario que no seas vos');
    }
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

  @Patch(':uuid/addresses/:addressUuid')
async updateAddress(@Param('uuid') userUuid: string, @Param('addressUuid') addressUuid: string, @Body() dto: AddressDto) {
  const user = await this.userService.updateAddress(userUuid, addressUuid, dto);
  return user;
  }

  @Delete(':uuid/addresses/:addressUuid')
  async deleteAddress(@Param('uuid') userUuid: string, @Param('addressUuid') addressUuid: string) {
    const result = await this.userService.deleteAddress(userUuid, addressUuid);
    return result;
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    const result = await this.userService.delete(uuid);
    return result;
  }
}
