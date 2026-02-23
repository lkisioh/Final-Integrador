import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductOrmEntity } from '../databases/product.orm-entity';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';
import { VendorOrmEntity } from '../../../vendors/infra/databases/vendor.orm-entity';

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
   vendorUuid: product.vendorUuid, 
   price: product.price,
   photo: product.photo,
   available: product.available,
  });

  const saved = await this.productRepo.save(ormProduct);

 
  const domainProduct = new ProductEntity();
  Object.assign(domainProduct, {
   id: saved.id,
   uuid: saved.uuid,
   name: saved.name,
   description: saved.description,
   price: saved.price,
   photo: saved.photo,
   available: saved.available,
  
 vendorUuid: saved.vendorUuid, 
 });

 return domainProduct;
}


async findAll(): Promise<ProductEntity[]> {
 const entities = await this.productRepo.find();

 return entities.map(entity => {
   const product = new ProductEntity();

   Object.assign(product, {
    uuid: entity.uuid,
    name: entity.name,
    description: entity.description,
    vendorUuid: entity.vendorUuid, 
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
    const entities = await this.productRepo.find({ where: { vendorUuid : uuid } });
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
        vendorUuid : entity.vendorUuid,
      });
      return product;
    });
  }
  async delete(productUuid: string): Promise<void> {
    await this.productRepo.delete({ uuid: productUuid });
}
async update(productUuid: string, data: UpdateProductDto): Promise<ProductEntity> {
    const productOrm = await this.productRepo.findOneBy({ uuid: productUuid });
    if (!productOrm) {
        throw new Error('Producto no encontrado'); 
    }
    Object.assign(productOrm, data);
    const updatedOrm = await this.productRepo.save(productOrm);

    const domainProduct = new ProductEntity();
    Object.assign(domainProduct, updatedOrm);
    return domainProduct;
}
async findByUuid(uuid: string): Promise<ProductEntity | null> {
    const productOrm = await this.productRepo.findOneBy({ uuid: uuid }); 
    
    if (!productOrm) {
        return null;
    }
        const domainProduct = new ProductEntity();
    Object.assign(domainProduct, productOrm);
    
    return domainProduct;
}
}
