import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// validar password con bcrypt
import * as bcrypt from 'bcrypt';

import { USER_REPO } from '../../../users/domain/repositories/user.repository.interface';
import { VENDOR_REPO } from '../../../vendors/domain/repositories/vendor.repository.interface';
import { DRIVER_REPO } from '../../../drivers/domain/repositories/driver.repository.interface';

import type { IUserRepository } from '../../../users/domain/repositories/user.repository.interface';
import type { IVendorRepository } from '../../../vendors/domain/repositories/vendor.repository.interface';
import type { IDriverRepository } from '../../../drivers/domain/repositories/driver.repository.interface';

type LoginResult =
  | { kind: 'final-user'; uuid: string; name?: string; email: string; passwordHash: string }
  | { kind: 'vendor'; uuid: string; name?: string; email: string; passwordHash: string }
  | { kind: 'driver'; uuid: string; name?: string; email: string; passwordHash: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepository,
    @Inject(VENDOR_REPO) private readonly vendorRepo: IVendorRepository,
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string): Promise<LoginResult | null> {
    // falta validar password, pero para eso el loginDto
    // debería tener password y no solo email. Lo dejo así por ahora para avanzar con el flujo, pero habría que ajustar eso después.
    // 1) users
    const user = await this.userRepo.findByEmail(email);
    if (user) {
      return {
        kind: 'final-user',
        uuid: user.uuid,
        name: (user as any).name,
        email: user.email,
        passwordHash: (user as any).passwordHash ?? (user as any).password, // ajustá al campo real
      };
    }

    // 2) vendors
    const vendor = await this.vendorRepo.findByEmail(email);
    if (vendor) {
      return {
        kind: 'vendor',
        uuid: vendor.uuid,
        name: (vendor as any).name,
        email: vendor.email,
        passwordHash: (vendor as any).passwordHash ?? (vendor as any).password,
      };
    }

    // 3) drivers
    const driver = await this.driverRepo.findByEmail(email);
    if (driver) {
      return {
        kind: 'driver',
        uuid: driver.uuid,
        name: (driver as any).name,
        email: driver.email,
        passwordHash: (driver as any).passwordHash ?? (driver as any).password,
      };
    }

    return null;
  }
}