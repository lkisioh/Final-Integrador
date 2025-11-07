import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductOrmEntity } from './infra/databases/product.orm-entity';
import { ProductRepositoryImpl } from './infra/repositories/product.repository.impl';

import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { ProductController } from './infra/controllers/product.controller';
import { IProductRepository } from './domain/repositories/product.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
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
  ],
  exports: ['IProductRepository'],
})
export class ProductsModule {}
