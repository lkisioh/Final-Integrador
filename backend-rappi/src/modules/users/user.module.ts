import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './infra/controllers/user.controller';
import { UserService } from './application/services/user.service';

import { UserOrmEntity } from './infra/databases/user.orm-entity';
import { AddressOrmEntity } from './infra/databases/address.orm-entity';

import { UserRepositoryImpl } from './infra/repositories/user.repository.impl';
import { USER_REPO } from './domain/repositories/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity, AddressOrmEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPO,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService, USER_REPO],
})
export class UsersModule {}
