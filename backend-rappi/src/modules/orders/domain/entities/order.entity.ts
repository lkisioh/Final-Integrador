import { OrderItemEntity } from './order-item.entity';

export class OrderEntity {
  id: number;
  uuid: string;
  userUuid: string;
  userName: string;
  userOrderAddress: string;

  createdAt: Date = new Date();

  vendorUuid: string;
  vendorName: string;
  items: OrderItemEntity[];
  status: string = 'pendiente';
  driverUuid: string | null = null;

  total: number;
}
