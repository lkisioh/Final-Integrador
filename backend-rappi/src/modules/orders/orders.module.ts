import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderOrmEntity } from './infra/databases/order.orm-entity';
import { PaymentOrmEntity } from '../payments/infra/databases/payment.orm-entity'; // Asegúrate que la ruta sea correcta
import { OrderRepositoryImpl } from './infra/repositories/order.repository.impl';

import { CreateOrderUseCase } from './application/use-cases/create-order.usecase';

import { OrderController } from './infra/controllers/orders.controller';
import { IOrderRepository } from './domain/repositories/order.repository.interface';
import { OrdersService } from './application/services/orders.service'; // Importa tu servicio

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity, PaymentOrmEntity])
  ],
  controllers: [OrderController],
  providers: [
    OrdersService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepositoryImpl,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) =>
        new CreateOrderUseCase(orderRepo),
      inject: ['IOrderRepository'],
    }
  ],
  exports: ['IOrderRepository', CreateOrderUseCase, OrdersService],
})

export class OrdersModule {}