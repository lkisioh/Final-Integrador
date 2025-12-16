import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { CreateProductUseCase } from '../use-cases/create-product.usecase';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  create(createProductDto, vendorUuid: string) {
    return this.createProductUseCase.execute(createProductDto, vendorUuid);
  }
}
