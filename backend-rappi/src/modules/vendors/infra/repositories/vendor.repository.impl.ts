import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { VendorOrmEntity } from '../databases/vendor.orm-entity';
import { AddressVendorOrmEntity } from '../databases/addressVendor.orm-entity';
import { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { VendorEntity } from '../../domain/entities/vendor.entity';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

//import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';

@Injectable()
export class VendorRepositoryImpl implements IVendorRepository {
  constructor(
    @InjectRepository(VendorOrmEntity)
    private readonly vendorRepo: Repository<VendorOrmEntity>,
  ) {}

  async findByEmail(
    email: string,
    password: string,
  ): Promise<{ uuid: string } | null> {
    const vendor = await this.vendorRepo.findOne({ where: { email, password } });
    if (!vendor) return null;
    return { uuid: vendor.uuid };
  }
  async findAll(): Promise<VendorEntity[]> {
    const vendors = await this.vendorRepo.find({relations: ['products']});
    return vendors.map((vendor) => {
      const domainVendor = new VendorEntity();
      Object.assign(domainVendor, vendor);
      domainVendor.products = (vendor.products ?? []).map(p => ({
                id: p.id,
                uuid: p.uuid,
                name: p.name,
                description: p.description,
                vendorUuid: p.vendorUuid, 
                price: p.price,
                photo: p.photo,
                available: p.available,
            }));
      return domainVendor;
    });
  }

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
  async createVendor(dto: CreateVendorDto): Promise<VendorEntity> {
    const newVendorUuid = uuidv4();

    const ormVendorData: DeepPartial<VendorOrmEntity> = {
      uuid: newVendorUuid,
      name: dto.name,
      category: dto.category,
      daysOpen: dto.daysOpen,
      time: dto.time,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      products: (dto.products ?? []).map(p => {
        const pr = new ProductOrmEntity();
        pr.name = p.name;
        pr.description = p.description;
        pr.price = p.price;
        pr.photo = p.photo;
        pr.available = p.available;
        return pr;
      }),
    };

    const ormVendor = this.vendorRepo.create(ormVendorData);

    if (dto.address) {
      const addressVendor = new AddressVendorOrmEntity();
      addressVendor.street = dto.address.street;
      addressVendor.number = dto.address.number ?? -1;

      // 🔥 ESTA ES LA CLAVE
      addressVendor.vendor = ormVendor;
      ormVendor.address = addressVendor;
    }

    console.log('DTO address:', dto.address);

    const saved = await this.vendorRepo.save(ormVendor);

    const check = await this.vendorRepo.findOne({
      where: { uuid: saved.uuid },
      relations: ['address'], // aunque sea eager, forzalo para test
    });

    console.log('CHECK vendor:', check);
    console.log('CHECK address:', check?.address);

    // respuesta json
    return {
      uuid: saved.uuid,
      name: saved.name,
      category: saved.category,
      daysOpen: saved.daysOpen,
      time: saved.time,
      email: saved.email,
      phone: saved.phone,
      products: (saved.products ?? []).map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        photo: p.photo,
        available: p.available,
      })),
      address: saved.address
        ? {
            street: saved.address.street,
            number: saved.address.number,
          }
        : null,
    } as VendorEntity;

    // respuesta básica - mapeada
    //const domainVendor = new VendorEntity();
    //Object.assign(domainVendor, saved);

    //return domainVendor;
  }

  async findById(id: number): Promise<VendorEntity | null> {
    const entity = await this.vendorRepo.findOne({ where: { id } });
    if (!entity) return null;

    const vendorFind = new VendorEntity();
    Object.assign(vendorFind, {
      id: entity.id,
      uuid: entity.uuid,
      name: entity.name,
    });

    return vendorFind;
  }
  async findByUuid(uuid: string): Promise<VendorEntity | null> {
    const vendor = await this.vendorRepo.findOne({ where: { uuid } });
    if (!vendor) return null;
    const domainVendor = new VendorEntity();
    Object.assign(domainVendor, vendor);
    return domainVendor;
  }
  async delete(uuid: string): Promise<string> {
    const entity = await this.vendorRepo.findOne({ where: { uuid } });
    if (!entity) return 'No se encontro Vendor con uuid: ' + uuid;
    return 'vendor eliminado correctamente';
  }
  async update(
    uuid: string,
    vendor: UpdateVendorDto,
  ): Promise<VendorEntity | string> {
    const entity = await this.vendorRepo.findOne({ where: { uuid } });
    if (!entity)
      return 'No se encontro Vendor con uuid: ' + uuid + ' para editar';
    const vendorFind = new VendorEntity();
    Object.assign(vendorFind, {
      id: entity.id,
      uuid: entity.uuid,
      name: vendor.name,
    });

    return vendorFind;
  }
}
