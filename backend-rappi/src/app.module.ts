import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AddressOrmEntity } from './infra/typeorm/entities/adress.orm-entity';

@Module({
  imports: [DatabaseModule, UserModule, AddressOrmEntity],
})
export class AppModule {}
