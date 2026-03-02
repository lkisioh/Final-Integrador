import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

async save(order: Partial<OrderEntity>): Promise<OrderEntity> {
  const ormOrder = this.orderRepo.create({
    uuid: order.uuid ?? uuidv4(),
    userUuid: order.userUuid ?? null,
    userName: order.userName ?? null,
    userOrderAddress: order.userOrderAddress ?? null,
    vendorUuid: order.vendorUuid ?? null,
    vendorName: order.vendorName ?? 'Vendor', 
    items: order.items ? order.items.map((i) => ({
      orderUuid: order.uuid ?? null,
      productUuid: i.productUuid,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      subtotal: i.subtotal ?? (i.unitPrice * i.quantity), 
    })) : [],

    status: order.status ?? 'PENDING',
    driverUuid: order.driverUuid ?? null,
    addressUuid: order.addressUuid ?? null,
    total: order.total ?? 0,
    
    paymentId: (order as any).paymentId ?? null, 
  }as DeepPartial<OrderOrmEntity>);

  const saved = await this.orderRepo.save(ormOrder);

  const orderWithVendor = await this.orderRepo.findOne({
    where: { uuid: saved.uuid },
    relations: ['vendor'], 
  });

  if (!orderWithVendor) {
    throw new Error('Error crítico: No se encontró la orden tras el guardado');
  }

  const domainOrder = new OrderEntity();
  Object.assign(domainOrder, {
    id: orderWithVendor.id ?? null,
    uuid: orderWithVendor.uuid,
    userUuid: orderWithVendor.userUuid,
    userName: orderWithVendor.userName,
    userOrderAddress: orderWithVendor.userOrderAddress,
    vendorUuid: orderWithVendor.vendorUuid,
    vendorName: orderWithVendor.vendor?.name || orderWithVendor.vendorName,
    items: orderWithVendor.items?.map((i) => ({
      productUuid: i.productUuid,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      subtotal: i.subtotal,
    })) || [],
    createdAt: orderWithVendor.createdAt,
    status: orderWithVendor.status,
    driverUuid: orderWithVendor.driverUuid,
    addressUuid: orderWithVendor.addressUuid,
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
  async findByDriverUuid(driverUuid: string): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find({ where: { driverUuid } });

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
  async findByVendorUuid(vendorUuid: string): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find({ where: { vendorUuid } });

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
  async findByUserUuid(userUuid: string): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find({ where: { userUuid } });
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
}
