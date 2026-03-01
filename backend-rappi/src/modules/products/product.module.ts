import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductOrmEntity } from './infra/databases/product.orm-entity';
import { ProductRepositoryImpl } from './infra/repositories/product.repository.impl';

import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';
import { UpdateProductUseCase } from './application/use-cases/update-product.usecase';

import { ProductController } from './infra/controllers/product.controller';
import { IProductRepository } from './domain/repositories/product.repository.interface';

import { VendorOwnsProductGuard } from '../auth/application/guards/vendor-owns-product.guard';
import { VendorUserOwnershipGuard } from '../auth/application/guards/vendor-ownership.guard'; // el que compara params.vendorUuid
import { OrderItemOrmEntity } from '../orders/infra/databases/order-item.orm-entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity, OrderItemOrmEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (productRepo: IProductRepository) =>
        new CreateProductUseCase(productRepo),
      inject: ['IProductRepository'],
    },
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
    },
    VendorOwnsProductGuard,
    VendorUserOwnershipGuard,
  ],
  exports: [
    'IProductRepository',
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
