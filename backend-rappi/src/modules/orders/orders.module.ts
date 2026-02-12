import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderOrmEntity } from './infra/databases/order.orm-entity';
import { OrderRepositoryImpl } from './infra/repositories/order.repository.impl';

import { CreateOrderUseCase } from './application/use-cases/create-order.usecase';

import { OrderController } from './infra/controllers/orders.controller';
import { IOrderRepository } from './domain/repositories/order.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'IOrderRepository',
      useClass: OrderRepositoryImpl,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) =>
        new CreateOrderUseCase(orderRepo),
      inject: ['IOrderRepository'],
    }/*
    {
      provide: DeleteProductUseCase,
      useFactory: (productRepo: IProductRepository) =>
        new DeleteProductUseCase(productRepo),
      inject: ['IProductRepository'],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (productRepo: IProductRepository) =>
        new UpdateProductUseCase(productRepo),
      inject: ['IProductRepository'],
    },*/
  ],
  exports: ['IOrderRepository', CreateOrderUseCase],
  /*DeleteOrderUseCase, UpdateOrderUseCase*/
})
export class OrdersModule {}
