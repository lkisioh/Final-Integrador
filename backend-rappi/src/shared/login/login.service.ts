import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/loginDto.js';
import { USER_REPO } from '../../modules/users/domain/repositories/user.repository.interface.js';
import { VENDOR_REPO } from '../../modules/vendors/domain/repositories/vendor.repository.interface';
import { DRIVER_REPO } from '../../modules/drivers/domain/repositories/driver.repository.interface';

import type { IUserRepository } from '../../modules/users/domain/repositories/user.repository.interface.js';
import type { IVendorRepository } from '../../modules/vendors/domain/repositories/vendor.repository.interface';
import type { IDriverRepository } from '../../modules/drivers/domain/repositories/driver.repository.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: IUserRepository,

    @Inject(VENDOR_REPO)
    private readonly vendorRepo: IVendorRepository,

    @Inject(DRIVER_REPO)
    private readonly driverRepo: IDriverRepository,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepo.findByEmail(email, password);
    const vendor = await this.vendorRepo.findByEmail(email, password);
    const driver = await this.driverRepo.findByEmail(email, password);

    let role = '';
    let uuid = '';
    if (user) {
      uuid = user.uuid;
      role = 'final-user';
    }
    if (driver) {
      uuid = driver.uuid;
      role = 'driver';
    }
    if (vendor) {
      uuid = vendor.uuid;
      role = 'vendor';
    }

    return {
      uuid,
      role,
      // token,
      redirectTo:
        role === 'driver'
          ? `/drivers/${uuid}`
          : role === 'vendor'
            ? `/vendors/${uuid}`
            : `/users/by-uuid/${uuid}`,
    };
  }
}
