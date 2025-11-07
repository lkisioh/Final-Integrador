import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UsersModule } from './modules/users/user.module';
import { AddressOrmEntity } from './modules/users/infra/databases/address.orm-entity';

import { VendorsModule } from './modules/vendors/vendor.module';
import { ProductsModule } from './modules/products/product.module';
import { DriversModule } from './modules/drivers/driver.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    DriversModule,
    AddressOrmEntity,
    VendorsModule,
    ProductsModule,
  ],
})
export class AppModule {}
