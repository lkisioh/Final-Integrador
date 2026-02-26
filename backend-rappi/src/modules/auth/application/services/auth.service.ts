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

//seguridad

import { JwtPayload, ActorType } from '../types/types';

type LoginResult =
  | { type: 'final-user'; uuid: string; name: string; email: string; passwordHash: string }
  | { type: 'vendor'; uuid: string; name: string; email: string; passwordHash: string }
  | { type: 'driver'; uuid: string; name: string; email: string; passwordHash: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepository,
    @Inject(VENDOR_REPO) private readonly vendorRepo: IVendorRepository,
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepository,
    private readonly jwt: JwtService,
  ) {}

  async findByEmail(email: string): Promise<LoginResult | null> {
    // 1) users
    const user = await this.userRepo.findByEmail(email);
    if (user) {
      return {
        type: 'final-user',
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        passwordHash: (user as any).passwordHash ?? (user as any).password,
      };
    }

    // 2) vendors
    const vendor = await this.vendorRepo.findByEmail(email);
    if (vendor) {
      return {
        type: 'vendor',
        uuid: vendor.uuid,
        name: vendor.name,
        email: vendor.email,
        passwordHash: (vendor as any).passwordHash ?? (vendor as any).password,
      };
    }

    // 3) drivers
    const driver = await this.driverRepo.findByEmail(email);
    if (driver) {
      return {
        type: 'driver',
        uuid: driver.uuid,
        name: driver.name,
        email: driver.email,
        passwordHash: (driver as any).passwordHash ?? (driver as any).password,
      };
    }

    return null;
  }
  async login(email: string, password: string) {
    const found = await this.findByEmail(email);
    if (!found) throw new UnauthorizedException('Credenciales inválidas');

    const stored = found.passwordHash;

    const isBcrypt =
      typeof stored === 'string' &&
      (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$'));

    let ok = false;

    if (isBcrypt) {
      ok = await bcrypt.compare(password, stored);
    } else {
      // ✅ legacy: texto plano
      ok = password === stored;

      // ✅ upgrade automático: si matchea, lo convertimos a hash y lo guardamos
      if (ok) {
        const newHash = await bcrypt.hash(password, 10);
        // según el tipo, actualizá en su tabla
        if (found.type === 'final-user') {
          await this.userRepo.updatePasswordHash(found.uuid, newHash);
        } else if (found.type === 'vendor') {
          await this.vendorRepo.updatePasswordHash(found.uuid, newHash);
        } else if (found.type === 'driver') {
          await this.driverRepo.updatePasswordHash(found.uuid, newHash);
        }
      }
    }

    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const payload: JwtPayload = {
      sub: found.uuid,
      type: found.type as ActorType,
      email: found.email,
      name: found.name,
    };

    const access_token = await this.jwt.signAsync(payload);

    return {
      access_token,
      actor: {
        uuid: found.uuid,
        type: found.type,
        email: found.email,
        name: found.name,
      },
    };
  }
}
