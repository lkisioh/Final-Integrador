import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../../application/dtos/update-product.dto'; 

export interface IProductRepository {
 findById(id: number): Promise<ProductEntity | null>;
 findAll(): Promise<ProductEntity[]>;
 findByVendorUuid(vendorUuid: string): Promise<ProductEntity[]>;
 save(product: ProductEntity): Promise<ProductEntity>;
 update(productUuid: string, data: UpdateProductDto): Promise<ProductEntity>;
 delete(productUuid: string): Promise<void>;
 findByUuid(uuid: string): Promise<ProductEntity | null>;
}
