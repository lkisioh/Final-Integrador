import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VendorService } from '../../application/services/vendor.service';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

// para seguridad

import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/application/decorators/public.decorator';
import { VendorUserOwnershipGuard } from 'src/modules/auth/application/guards/vendor-ownership.guard';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.vendorService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateVendorDto) {
    return this.vendorService.create(dto);
  }

  @UseGuards(JwtAuthGuard, VendorUserOwnershipGuard)
  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    return this.vendorService.findByUuid(uuid);
  }
  @UseGuards(JwtAuthGuard, VendorUserOwnershipGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateVendorDto) {
    return this.vendorService.update(uuid, dto);
  }
  @UseGuards(JwtAuthGuard, VendorUserOwnershipGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.vendorService.delete(uuid);
  }
}
