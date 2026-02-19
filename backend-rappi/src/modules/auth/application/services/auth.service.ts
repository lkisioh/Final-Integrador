import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/application/services/users.service'; // ajustá ruta

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email); // implementalo
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.passwordHash); // o user.password
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: user.uuid,
      role: user.role,
      email: user.email,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return { accessToken };
  }
}