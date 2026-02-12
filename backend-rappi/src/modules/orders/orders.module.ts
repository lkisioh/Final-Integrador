import { Module } from '@nestjs/common';
import { OrdersController } from './infra/controllers/orders.controller';
import { OrdersService } from './application/services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}