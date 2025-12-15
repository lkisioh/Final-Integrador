import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { VendorService } from '../../application/services/vendor.service';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async create(@Body() dto: CreateVendorDto) {
    return this.vendorService.create(dto);
  }

  @Get()
  async findAll() {
    return this.vendorService.findAll();
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    return this.vendorService.findByUuid(uuid);
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateVendorDto) {
    return this.vendorService.update(uuid, dto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.vendorService.delete(uuid);
  }
}
