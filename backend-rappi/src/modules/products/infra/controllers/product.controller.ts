import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
//import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { Inject } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }
  @Get()
  async findAll() {
    const products = await this.productRepository.findAll();
    return products;
  }
  @Get(':vendorUuid')
  async findByVendorUuid(@Body('vendorUuid') vendorUuid: string) {
    const products = await this.productRepository.findByVendorUuid(vendorUuid);
    return products;
  }
}
