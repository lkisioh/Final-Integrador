import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.usecase';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { NotFoundException } from '@nestjs/common';

// Seguridad

import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { ActorTypesGuard } from 'src/modules/auth/application/guards/actor-types.guard';
import { ActorTypes } from 'src/modules/auth/application/types/actor-types.decorator';

import { VendorOwnsProductGuard } from 'src/modules/auth/application/guards/vendor-owns-product.guard';
import { VendorUserOwnershipGuard } from 'src/modules/auth/application/guards/vendor-ownership.guard'; // el que compara params.vendorUuid

@Controller('/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('final-user', 'vendor')
  @Get()
  async findAll() {
    const products = await this.productRepository.findAll();
    return products;
  }

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('final-user', 'vendor')
  @Get('/vendor/:vendorUuid')
  async findAllByVendor(@Param('vendorUuid') vendorUuid: string) {
    const products = await this.productRepository.findByVendorUuid(vendorUuid);
    return products;
  }

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('final-user', 'vendor')
  @Get('/:uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const product = await this.productRepository.findByUuid(uuid);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }
  @UseGuards(JwtAuthGuard, VendorUserOwnershipGuard)
  @Post('/:vendorUuid')
  async create(
    @Param('vendorUuid') vendorUuid: string,
    @Body() dto: CreateProductDto,
  ) {
    return await this.createProductUseCase.execute(dto, vendorUuid);
  }

  @UseGuards(JwtAuthGuard, VendorOwnsProductGuard)
  @Patch('/:vendorUuid/:productUuid')
  async update(
    @Param('productUuid') productUuid: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.updateProductUseCase.execute(productUuid, dto);
  }

  @UseGuards(JwtAuthGuard, VendorUserOwnershipGuard, VendorOwnsProductGuard)
  @Delete('/:vendorUuid/:productUuid')
  async delete(@Param('productUuid') productUuid: string) {
    return await this.deleteProductUseCase.execute(productUuid);
  }
}
