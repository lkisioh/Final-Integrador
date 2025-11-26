import { Injectable } from '@nestjs/common';
import type { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { VendorEntity } from '../../domain/entities/vendor.entity';
/*import { CreateVendorDto } from '../dtos/create-vendor.dto';

@Injectable()
export class CreateVendorUseCase {
  constructor(private readonly vendorRepo: IVendorRepository) {}

  async execute(dto: CreateVendorDto): Promise<VendorEntity> {
    const vendor = new VendorEntity();
    vendor.name = dto.name;
    vendor.category = dto.category;
    vendor.daysOpen = dto.daysOpen;
    vendor.time = dto.time;
    vendor.email = dto.email;
    vendor.phone = dto.phone;
    vendor.products = vendor.products ?? [];
    vendor.address = vendor.address ?? {
      street: dto.address?.street,
      number: dto.address?.number,
      vendorUuid: vendor.uuid,
    };
    vendor.password = dto.password;

    return await this.vendorRepo.save(vendor);
  }
}
*/