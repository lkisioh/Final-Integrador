import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { VendorOrmEntity } from '../databases/vendor.orm-entity';
import { AddressVendorOrmEntity } from '../databases/addressVendor.orm-entity';
import { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { VendorEntity } from '../../domain/entities/vendor.entity';

//import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';

@Injectable()
export class VendorRepositoryImpl implements IVendorRepository {
  constructor(
    @InjectRepository(VendorOrmEntity)
    private readonly userRepo: Repository<VendorOrmEntity>,
  ) {}

  async save(vendor: VendorEntity): Promise<VendorEntity> {
    const addressEntities = (vendor.address ?? {}).map(a => {
      const addr = new AddressVendorOrmEntity();
      addr.street = a.street;
      addr.number = a.number;
      return addr;
    });

     const productsEntities = (vendor.products ?? []).map(p => {
          const pr = new ProductOrmEntity();
          pr.name = p.name;
          pr.description = p.description;
          pr.price = p.price;
          pr.photo = p.photo;
          pr.available = p.available;
          return pr;
        });

    const ormVendor = this.userRepo.create({
      uuid: vendor.uuid ?? uuidv4(),
      marketName: vendor.marketName,
      category: vendor.category,
      daysOpen: vendor.daysOpen,
      time: vendor.time,
      email: vendor.email,
      phone: vendor.phone,
      products: productsEntities,
      address: addressEntities, 
    });

    const saved = await this.userRepo.save(ormVendor);

    // Devolvemos al dominio
    const domainVendor = new VendorEntity();
    Object.assign(domainVendor, {
      id: saved.id,
      uuid: saved.uuid,
      marketName: saved.marketName,
      category: saved.category,
      daysOpen: saved.daysOpen,
      time: saved.time,
      email: saved.email,
      phone: saved.phone,
      products: saved.products.map(produ => ({
        name: produ.name,
        description: produ.description,
        price: produ.price,
        photo: produ.photo,
        available: produ.available,
      })),
      adress: saved.address,
    });

    return domainVendor;
  }

  async findById(id: number): Promise<VendorEntity | null> {
    const entity = await this.userRepo.findOne({ where: { id } });
    if (!entity) return null;

    const vendorFind = new VendorEntity();
    Object.assign(vendorFind, {
      id: entity.id,
      uuid: entity.uuid,
      marketName: entity.marketName,
    });

    return vendorFind;
  }
  async findByUuid(uuid: string): Promise<VendorEntity | null> {
    const entity = await this.userRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const vendorFind = new VendorEntity();
    Object.assign(vendorFind, {
      id: entity.id,
      uuid: entity.uuid,
      marketName: entity.marketName,
    });

    return vendorFind;
  }
}