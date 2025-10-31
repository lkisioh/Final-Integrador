import { Controller, Post, Body } from '@nestjs/common';
import { CreateVendorUseCase } from '../../application/use-cases/create-vendor.usecase';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
//import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Controller('vendors')
export class VendorController {
  constructor(private readonly createVendorUseCase: CreateVendorUseCase) {}

  @Post()
  async create(@Body() dto: CreateVendorDto) {
    return await this.createVendorUseCase.execute(dto);
  }
}