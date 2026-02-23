import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infra/controllers/auth.controller';
import { JwtStrategy } from './application/strategies/jwt.strategy';

import { UsersModule } from '../users/user.module';
import { VendorsModule } from '../vendors/vendor.module';
import { DriversModule } from '../drivers/driver.module';

import type { StringValue } from 'ms';
@Module({
  imports: [
    ConfigModule,
    UsersModule,
    VendorsModule,
    DriversModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (cfg.get<string>('JWT_EXPIRES_IN') ?? '1h') as StringValue,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
