import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders: any[] = []; 

  create(orderData: any) {
    const newOrder = {
      ...orderData,
      id: this.orders.length + 1,
      uuid: Math.random().toString(36).substring(2, 11),
      status: 'pendiente',
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(status?: string, storeId?: string, userUuid?: string) {
    let result = [...this.orders];

    if (status) result = result.filter(o => o.status === status);
    if (storeId) result = result.filter(o => o.storeId === storeId);
    if (userUuid) result = result.filter(o => o.userUuid === userUuid);

    return result;
  }

  updateStatus(uuid: string, status: string, driverUuid?: string, driverNombre?: string) {
    const order = this.orders.find(o => o.uuid === uuid);
    if (!order) throw new NotFoundException('Orden no encontrada');

    order.status = status;
    if (driverUuid) order.driverUuid = driverUuid;
    if (driverNombre) order.driverNombre = driverNombre;
    return order;
  }
}