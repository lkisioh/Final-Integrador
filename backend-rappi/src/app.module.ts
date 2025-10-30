import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UsersModule } from './modules/users/user.module';
import { AddressOrmEntity } from './modules/users/infra/databases/address.orm-entity';

@Module({
  imports: [DatabaseModule, UsersModule, AddressOrmEntity],
})
export class AppModule {}
