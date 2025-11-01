import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infra/databases/user.orm-entity';
import { AddressOrmEntity } from './infra/databases/address.orm-entity';
import { UserRepositoryImpl } from './infra/repositories/user.repository.impl';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserController } from './infra/controllers/user.controller';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity, AddressOrmEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: IUserRepository) => new CreateUserUseCase(userRepo),
      inject: ['IUserRepository'],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo: IUserRepository) => new UpdateUserUseCase(userRepo),
      inject: ['IUserRepository'],
    },
  ],
  exports: ['IUserRepository'],
})
export class UsersModule {}
