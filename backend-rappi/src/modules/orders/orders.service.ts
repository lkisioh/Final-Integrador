import { Injectable } from '@nestjs/common';

export interface Order {
  id: number;
  uuid: string;
  userUuid: string;
  storeName: string;
  totalAPagar: number;
  status: string;
  driverUuid: string | null;
  items: any[];
  direccionEnvio: any;
  createdAt: Date;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = []; 

  create(orderData: any) {
    const newOrder: Order = {
      ...orderData,
      id: this.orders.length + 1,
      uuid: Math.random().toString(36).substring(2, 11),
      status: 'pendiente',
      driverUuid: null,
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(status?: string) {
    if (status) {
      return this.orders.filter(order => order.status === status);
    }
    return this.orders;
  }

  updateStatus(uuid: string, status: string, driverUuid: string) {
    const order = this.orders.find(o => o.uuid === uuid);
    if (order) {
      order.status = status;
      order.driverUuid = driverUuid;
      return order;
    }
    return null;
  }
}