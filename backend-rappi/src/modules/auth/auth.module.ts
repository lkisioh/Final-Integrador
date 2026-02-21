import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infra/controllers/auth.controller';
import { JwtStrategy } from './application/strategies/jwt.strategy';

import { UsersModule } from 'src/modules/users/user.module';
import { VendorsModule } from 'src/modules/vendors/vendor.module';
import { DriversModule } from 'src/modules/drivers/driver.module';
//prueba string no null ni generico
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
