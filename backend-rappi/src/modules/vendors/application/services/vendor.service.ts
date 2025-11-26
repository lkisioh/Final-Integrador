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

  create(createVendorDto: CreateVendorDto) {
    return this.vendorRepository.save(createVendorDto);
  }
  //update(uuid: string, dto: UpdateVendorDto) {
  //  return this.vendorRepository.update(uuid, dto);
  //}
}
/** 

@Injectable()


  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getByUuid(uuid: string) {
    return this.userRepository.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateUserDto) {
    return this.userRepository.update(dto, uuid);
  }

  async delete(uuid: string) {
    await this.userRepository.delete(uuid);
    return { message: 'User deleted successfully' };
  }
}
 */