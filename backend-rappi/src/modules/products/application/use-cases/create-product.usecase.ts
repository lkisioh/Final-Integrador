import { Injectable } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
// import { Omit } from '@nestjs/mapped-types'; 
@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(
    dto: CreateProductDto, 
    vendorUuid: string 
    ): Promise<ProductEntity> {
  const product = new ProductEntity();
    
 product.vendorUuid = vendorUuid; 
  product.name = dto.name;
  product.description = dto.description;
  product.price = dto.price;
  product.photo = dto.photo;
  product.available = dto.available;

  return await this.productRepo.save(product);
 }
}
