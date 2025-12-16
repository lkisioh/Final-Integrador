import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { UpdateProductDto } from '../dtos/update-product.dto'; 
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepo: IProductRepository,
    ) {}

    async execute(productUuid: string, data: UpdateProductDto): Promise<ProductEntity> {
        
        return await this.productRepo.update(productUuid, data);
    }
}