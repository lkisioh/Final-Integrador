import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserOrmEntity } from '../../infra/typeorm/entities/user.orm-entity';
import { UserRepositoryImpl } from '../../infra/adapters/user.repository.impl';
//usos
import { FindUsersUseCase } from '../../application/use-cases/find-users.usecase';
import { CreateUsersUseCase } from 'src/application/use-cases/create-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    FindUsersUseCase,
    CreateUsersUseCase,
    { provide: 'IUserRepository', useClass: UserRepositoryImpl }, 
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}