import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderOrmEntity } from '../databases/order.orm-entity';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
  ) {}

  async save(order: OrderEntity): Promise<OrderEntity> {
    const ormOrder = this.orderRepo.create({
      uuid: order.uuid ?? uuidv4(),
      userUuid: order.userUuid,
      userName: order.userName,
      userOrderAddress: order.userOrderAddress,
      vendorUuid: order.vendorUuid,
      products: order.products,
      status: order.status,
      driverUuid: order.driverUuid,
      driverName: order.driverName,
      total: order.total,
    });

    const saved = await this.orderRepo.save(ormOrder);

    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: saved.id,
      uuid: saved.uuid,
      userUuid: saved.userUuid,
      userName: saved.userName,
      userOrderAddress: saved.userOrderAddress,
      createdAt: saved.createdAt,
      vendorUuid: saved.vendorUuid,
      vendorName: saved.vendor ? saved.vendor.name : null,
      products: saved.products,
      status: saved.status,
      driverUuid: saved.driverUuid,
      driverName: saved.driverName,
      total: saved.total,
    });

    return domainOrder;
  }

  async findAll(): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find();

    return entities.map(entity => {
      const order = new OrderEntity();

      Object.assign(order, {
        id: entity.uuid,
        uuid: entity.uuid,
        userUuid: entity.userUuid,
        userName: entity.userName,
        userOrderAddress: entity.userOrderAddress,
        vendorUuid: entity.vendorUuid,
        vendorName: entity.vendor ? entity.vendor.name : null,
        products: entity.products,
        createdAt: entity.createdAt,
        status: entity.status,
        driverUuid: entity.driverUuid,
        driverName: entity.driverName,
        total: entity.total,
      });
      return order;
    });
  }
  /*
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
}*/
}
