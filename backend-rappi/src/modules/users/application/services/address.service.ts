import { Injectable, Inject } from '@nestjs/common';

import type { IAddressRepository } from '../../domain/repositories/address.repository.interface';

@Injectable()
export class AddressService {
  constructor(
    @Inject('IAddressRepository')
    private readonly adressRepository: IAddressRepository
  ) {}

  findUuid(uuid) {
    return this.adressRepository.findByUuid(uuid);
  }
}
