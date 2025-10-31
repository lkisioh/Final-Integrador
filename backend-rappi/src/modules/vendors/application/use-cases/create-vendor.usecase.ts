import { Injectable } from '@nestjs/common';
import type { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { VendorEntity } from '../../domain/entities/vendor.entity';
import { AddressEntity } from '../../domain/entities/addressVendor.entity';
import { CreateVendorDto } from '../dtos/create-vendor.dto';

@Injectable()
export class CreateVendorUseCase {
  constructor(private readonly userRepo: IVendorRepository) {}

  async execute(dto: CreateVendorDto): Promise<VendorEntity> {
    const vendor = new VendorEntity();
    vendor.marketName = dto.marketName;
    vendor.category = dto.category;
    vendor.daysOpen = dto.daysOpen;
    vendor.time = dto.time;
    vendor.email = dto.email;
    vendor.phone = dto.phone;
    vendor.products = vendor.products ?? [];
    vendor.address = vendor.address ?? {};

    return await this.userRepo.save(vendor);
  }
}
