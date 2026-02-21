import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { UsersModule } from './modules/users/user.module';
import { VendorsModule } from './modules/vendors/vendor.module';
import { ProductsModule } from './modules/products/product.module';
import { DriversModule } from './modules/drivers/driver.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    DriversModule,
    VendorsModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
