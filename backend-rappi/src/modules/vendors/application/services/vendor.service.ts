import { Injectable, Inject } from '@nestjs/common';
import { VENDOR_REPO } from '../../domain/repositories/vendor.repository.interface';
import type { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { CreateVendorDto } from '../dtos/create-vendor.dto';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @Inject(VENDOR_REPO)
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async create(dto: CreateVendorDto) {
    return this.vendorRepository.createVendor(dto);
  }

  async findAll() {
    return this.vendorRepository.findAll();
  }

  async findByUuid(uuid: string) {
    return this.vendorRepository.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateVendorDto) {
    return this.vendorRepository.update(uuid, dto);
  }

  async delete(uuid: string) {
    await this.vendorRepository.delete(uuid);
    return { message: 'Vendor deleted successfully' };
  }
}