import { Controller, Post, Body, Get, Param, Delete, Patch, Inject } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.usecase';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
//import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Controller('vendors/:vendorUuid/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}
  @Get() 
 async findAllByVendor(@Param('vendorUuid') vendorUuid: string ) {
      const products = await this.productRepository.findByVendorUuid(vendorUuid); 
      return products;
 }
 @Get(':productUuid') 
    async findOne(@Param('productUuid') productUuid: string) {
        
        const product = await this.productRepository.findByUuid(productUuid); 
        
        if (!product) {
            throw new Error(`Product con UUID ${productUuid} no encontrado`);
        }
        
        return product;
    }
  @Post()
 async create(@Param('vendorUuid') vendorUuid: string, @Body() dto: CreateProductDto) {
     return await this.createProductUseCase.execute(dto, vendorUuid);
 }
 @Delete(':productUuid')
 async delete(@Param('productUuid') productUuid: string) {
     return await this.deleteProductUseCase.execute(productUuid);
 }
  @Patch(':productUuid')
  async update(@Param('productUuid') productUuid: string, @Body() dto: UpdateProductDto) : Promise<ProductEntity> {
      return await this.updateProductUseCase.execute(productUuid, dto);
  }
  
}
