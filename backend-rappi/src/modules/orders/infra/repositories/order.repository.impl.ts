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
    const ormOrder: OrderOrmEntity = this.orderRepo.create({
      uuid: order.uuid ?? uuidv4(),
      userUuid: order.userUuid ?? null,
      userName: order.userName ?? null,
      userOrderAddress: order.userOrderAddress ?? null,
      vendorUuid: order.vendorUuid ?? null,
      vendorName: order.vendorName,
      items: order.items.map((i) => ({
        orderUuid: order.uuid,
        productUuid: i.productUuid,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.subtotal,
      })),
      status: order.status,
      driverUuid: order.driverUuid ?? null,
      total: order.total,
    });

    const saved = await this.orderRepo.save(ormOrder);

    const orderWithVendor = await this.orderRepo.findOne({
      where: { uuid: saved.uuid },
      relations: ['vendor'],
    });

    if (!orderWithVendor) {
      throw new Error('Order not found after save');
    }

    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: orderWithVendor.id ?? null,
      uuid: orderWithVendor.uuid,
      userUuid: orderWithVendor.userUuid,
      userName: orderWithVendor.userName,
      userOrderAddress: orderWithVendor.userOrderAddress,
      vendorUuid: orderWithVendor.vendorUuid,
      vendorName: orderWithVendor.vendor.name,
      items: orderWithVendor.items.map((i) => ({
        productUuid: i.productUuid,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.subtotal,
      })),
      createdAt: orderWithVendor.createdAt,
      status: orderWithVendor.status,
      driverUuid: orderWithVendor.driverUuid,
      total: orderWithVendor.total,
    });

    return domainOrder;
  }

  async findAll(): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find();

    return entities.map((entity) => {
      const order = new OrderEntity();

      Object.assign(order, {
        id: entity.id,
        uuid: entity.uuid,
        userUuid: entity.userUuid,
        userName: entity.userName,
        userOrderAddress: entity.userOrderAddress,
        vendorUuid: entity.vendorUuid,
        vendorName: entity.vendorName,
        items: entity.items.map((i) => ({
          productUuid: i.productUuid,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          subtotal: i.subtotal,
        })),
        createdAt: entity.createdAt,
        status: entity.status,
        driverUuid: entity.driverUuid,
        total: entity.total,
      });
      return order;
    });
  }

  async assignDriver(uuid: string, status: string, driverUuid: string): Promise<OrderEntity> {
    const orderOrm = await this.orderRepo.findOneBy({ uuid });
    if (!orderOrm) {
      throw new Error('Order not found');
    }
    orderOrm.status = status;
    orderOrm.driverUuid = driverUuid;
    const updatedOrm = await this.orderRepo.save(orderOrm);
    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: updatedOrm.id ?? null,
      uuid: updatedOrm.uuid,
      userUuid: updatedOrm.userUuid,
      userName: updatedOrm.userName,
      userOrderAddress: updatedOrm.userOrderAddress,
      vendorUuid: updatedOrm.vendorUuid,
      vendorName: updatedOrm.vendorName,
      items: updatedOrm.items.map((i) => ({
        productUuid: i.productUuid,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.subtotal,
      })),
      createdAt: updatedOrm.createdAt,
      status: updatedOrm.status,
      driverUuid: updatedOrm.driverUuid,
      driverNombre: updatedOrm.driverName,
      total: updatedOrm.total,
    });
    return domainOrder;
  }

  async updateStatus(uuid: string, status: string): Promise<OrderEntity> {
    const orderOrm = await this.orderRepo.findOneBy({ uuid });
    if (!orderOrm) {
      throw new Error('Order not found');
    }
    orderOrm.status = status;
    const updatedOrm = await this.orderRepo.save(orderOrm);
    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: updatedOrm.id ?? null,
      uuid: updatedOrm.uuid,
      userUuid: updatedOrm.userUuid,
      userName: updatedOrm.userName,
      userOrderAddress: updatedOrm.userOrderAddress,
      vendorUuid: updatedOrm.vendorUuid,
      vendorName: updatedOrm.vendorName,
      items: updatedOrm.items.map((i) => ({
        productUuid: i.productUuid,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.subtotal,
      })),
      createdAt: updatedOrm.createdAt,
      status: updatedOrm.status,
      driverUuid: updatedOrm.driverUuid,
      driverNombre: updatedOrm.driverName,
      total: updatedOrm.total,
    });
    return domainOrder;
  }
  async finishDelivery(uuid: string, status: string, driverUuid: string): Promise<OrderEntity> {
    const orderOrm = await this.orderRepo.findOneBy({ uuid });
    if (!orderOrm) {
      throw new Error('Order not found');
    }
    orderOrm.status = status;
    const updatedOrm = await this.orderRepo.save(orderOrm);
    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: updatedOrm.id ?? null,
      uuid: updatedOrm.uuid,
      userUuid: updatedOrm.userUuid,
      userName: updatedOrm.userName,
      userOrderAddress: updatedOrm.userOrderAddress,
      vendorUuid: updatedOrm.vendorUuid,
      vendorName: updatedOrm.vendorName,
      items: updatedOrm.items.map((i) => ({
        productUuid: i.productUuid,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.subtotal,
      })),
      createdAt: updatedOrm.createdAt,
      status: updatedOrm.status,
      driverUuid: updatedOrm.driverUuid,
      driverNombre: updatedOrm.driverName,
      total: updatedOrm.total,
    });
    return domainOrder;
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
