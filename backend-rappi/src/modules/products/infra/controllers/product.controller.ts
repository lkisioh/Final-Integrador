import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
//import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }
}