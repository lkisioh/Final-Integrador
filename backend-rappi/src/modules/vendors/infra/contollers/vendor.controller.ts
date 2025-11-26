import { Controller,Inject, Post, Body, Get } from '@nestjs/common';
//import { CreateVendorUseCase } from '../../application/use-cases/create-vendor.usecase';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import type { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly createVendorDto: CreateVendorDto,
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateVendorDto) {
    return await this.vendorRepository.save(dto);
  }

  @Get()
  async findAll() {
    const vendors = await this.vendorRepository.findAll();
    return vendors;
  }

}