import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductOrmEntity } from '../databases/product.orm-entity';

import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';
import { VendorOrmEntity } from 'src/modules/vendors/infra/databases/vendor.orm-entity';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepo: Repository<ProductOrmEntity>,
  ) {}

  async save(product: ProductEntity): Promise<ProductEntity> {
    let vendorRel: VendorOrmEntity | undefined = undefined;
    if (product.vendorUuid) {
      vendorRel = new VendorOrmEntity();
      vendorRel.uuid = product.vendorUuid;
    }

    const ormProduct = this.productRepo.create({
      uuid: product.uuid ?? uuidv4(),
      name: product.name,
      description: product.description,
      vendor_uuid: vendorRel,
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
      vendorUuid: saved.vendor_uuid ?? VendorOrmEntity,
    });

    return domainProduct;
  }
  async findAll(): Promise<ProductEntity[]> {
    const entities = await this.productRepo.find();

    let vendorRel: VendorOrmEntity | undefined = undefined;
    return entities.map(entity => {
      const product = new ProductEntity();
      if(product.vendorUuid){
        vendorRel = new VendorOrmEntity();
        vendorRel.uuid = product.vendorUuid;
      }
      Object.assign(product, {
        uuid: entity.uuid,
        name: entity.name,
        description: entity.description,
        vendorUuid: vendorRel,
        price: entity.price,
        photo: entity.photo,
        available: entity.available,
      });
      return product;
    });
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
  async findByVendorUuid(uuid: string): Promise<ProductEntity[]> {
    const entities = await this.productRepo.find({ where: { vendor_uuid: { uuid } }, relations: ['vendor_uuid'] });
    return entities.map(entity => {
      const product = new ProductEntity();
      Object.assign(product, {
        id: entity.id,
        uuid: entity.uuid,
        name: entity.name,
        description: entity.description,
        price: entity.price,
        photo: entity.photo,
        available: entity.available,
      });
      return product;
    });
  }
}
