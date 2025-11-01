import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductOrmEntity } from '../databases/product.orm-entity';

import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepo: Repository<ProductOrmEntity>,
  ) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    const ormProduct = this.productRepo.create({
      uuid: product.uuid ?? uuidv4(),
      name: product.name,
      description: product.description,
      price: product.price,
      photo: product.photo,
      available: product.available,
    });

    const saved = await this.productRepo.save(ormProduct);

    // Devolvemos al dominio
    const domainProduct = new ProductEntity();
    Object.assign(domainProduct, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      description: saved.description,
      price: saved.price,
      photo: saved.photo,
      available: saved.available,
    });

    return domainProduct;
  }

  async findById(id: number): Promise<ProductEntity | null> {
    const entity = await this.productRepo.findOne({ where: { id } });
    if (!entity) return null;

    const productFind = new ProductEntity();
    Object.assign(productFind, {
      id: entity.id,
      uuid: entity.uuid,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      photo: entity.photo,
      available: entity.available,
    });

    return productFind;
  }
}
