import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  findById(id: number): Promise<ProductEntity | null>;
  save(product: ProductEntity): Promise<ProductEntity>;
}
