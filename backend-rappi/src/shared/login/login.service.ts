import { Injectable, Inject } from '@nestjs/common';
import { USER_REPO, VENDOR_REPO, DRIVER_REPO } from 'src/shared/tokens/tokens';
import type { IUserRepository } from 'src/modules/users/domain/repositories/user.repository.interface';
import type { IVendorRepository } from 'src/modules/vendors/domain/repositories/vendor.repository.interface';
import type { IDriverRepository } from 'src/modules/drivers/domain/repositories/driver.repository.interface';
import { LoginDto } from '../dtos/loginDto';
@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPO) private readonly users: IUserRepository,
    @Inject(VENDOR_REPO) private readonly vendors: IVendorRepository,
    @Inject(DRIVER_REPO) private readonly drivers: IDriverRepository,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.users.findByEmail(email, password);
    const vendor = await this.vendors.findByEmail(email, password);
    const driver = await this.drivers.findByEmail(email, password);

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
