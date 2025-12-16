import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepo: IProductRepository,
    ) {}

    async execute(productUuid: string): Promise<void> {
        return await this.productRepo.delete(productUuid);
    }
}