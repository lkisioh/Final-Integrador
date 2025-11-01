import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
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
    private readonly vendorRepo: Repository<VendorOrmEntity>,
  ) {}

  /*async save(vendor: VendorEntity): Promise<VendorEntity> {
    const addressVendor = new AddressVendorOrmEntity();
    if (vendor.address) {
      addressVendor.street = vendor.address.street;
      addressVendor.number = vendor.address.number;
    }

    const productsEntities = (vendor.products ?? []).map(p => {
      const pr = new ProductOrmEntity();
      pr.name = p.name;
      pr.description = p.description;
      pr.price = p.price;
      pr.photo = p.photo;
      pr.available = p.available;
      return pr;
    });

    const ormVendor = this.vendorRepo.create({
      uuid: vendor.uuid ?? uuidv4(),
      marketName: vendor.marketName,
      category: vendor.category,
      daysOpen: vendor.daysOpen,
      time: vendor.time,
      email: vendor.email,
      phone: vendor.phone,
      products: productsEntities,
      address: addressVendor,
    });

    const saved = await this.vendorRepo.save(ormVendor);

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
      address: saved.address,
    });

    return domainVendor;
  }*/

  async save(vendor: VendorEntity): Promise<VendorEntity> {
    console.log('Vendor recibido:', vendor);
    console.log('Address dentro de vendor:', vendor.address);
    // 🧩 Crear la entidad Address (solo si hay dirección)
    let addressVendor: AddressVendorOrmEntity | undefined = undefined;

    if (vendor.address) {
      addressVendor = new AddressVendorOrmEntity();
      addressVendor.street = vendor.address.street;
      addressVendor.number = vendor.address.number;
      // no le pongas vendorUuid directamente, TypeORM se encarga por la relación
    }

    // 🧩 Crear las entidades Product
    const productsEntities = (vendor.products ?? []).map((p) => {
      const pr = new ProductOrmEntity();
      pr.name = p.name;
      pr.description = p.description;
      pr.price = p.price;
      pr.photo = p.photo;
      pr.available = p.available;
      return pr;
    });

    // 🧩 Crear el vendor ORM listo para guardar
    const ormVendorData: DeepPartial<VendorOrmEntity> = {
      uuid: vendor.uuid ?? uuidv4(),
      marketName: vendor.marketName,
      category: vendor.category,
      daysOpen: vendor.daysOpen,
      time: vendor.time,
      email: vendor.email,
      phone: vendor.phone,
      products: productsEntities,
      address: addressVendor ?? undefined, // ✅ ahora address tiene valores reales o undefined
    };

    const ormVendor = this.vendorRepo.create(ormVendorData);

    //ver error
    console.log('ORM Vendor:', ormVendor);
    // 🧩 Guardar en la base de datos (TypeORM hace cascade con address y products)
    const savedResult = (await this.vendorRepo.save(ormVendor)) as
      | VendorOrmEntity
      | VendorOrmEntity[];

    // TypeORM.save can return the entity or an array when saving multiple items.
    // Normalize to a single entity to keep TypeScript happy.
    const savedEntity: VendorOrmEntity = Array.isArray(savedResult)
      ? (savedResult[0] as VendorOrmEntity)
      : (savedResult as VendorOrmEntity);

    // 🧩 Volver al dominio
    const domainVendor = new VendorEntity();
    Object.assign(domainVendor, {
      id: savedEntity.id,
      uuid: savedEntity.uuid,
      marketName: savedEntity.marketName,
      category: savedEntity.category,
      daysOpen: savedEntity.daysOpen,
      time: savedEntity.time,
      email: savedEntity.email,
      phone: savedEntity.phone,
      products: (savedEntity.products ?? []).map((produ) => ({
        name: produ.name,
        description: produ.description,
        price: produ.price,
        photo: produ.photo,
        available: produ.available,
      })),
      address: savedEntity.address,
    });

    return domainVendor;
  }

  async findById(id: number): Promise<VendorEntity | null> {
    const entity = await this.vendorRepo.findOne({ where: { id } });
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
    const entity = await this.vendorRepo.findOne({ where: { uuid } });
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
