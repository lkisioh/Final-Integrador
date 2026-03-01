import { Injectable, Inject, ConflictException } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(productUuid: string): Promise<{ message: string }> {
    const hasItems = await this.productRepo.hasOrderItems(productUuid);
    if (hasItems) {
      throw new ConflictException(
        'No se puede borrar: producto usado en pedidos. Marcá como no disponible.'
      );
    }

    await this.productRepo.delete(productUuid);
    return { message: 'Producto eliminado' };
  }
}
