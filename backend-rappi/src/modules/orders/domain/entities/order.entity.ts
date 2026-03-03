import { OrderItemEntity } from './order-item.entity';

export class OrderEntity {
  uuid: string;
  userUuid: string;
  userName: string;
  userOrderAddress: string;
  
  paymentId: string;
  createdAt: Date = new Date();
  paymentMethod?: string;
  vendorUuid: string;
  vendorName: string;
  items: OrderItemEntity[];
  status: string = 'pendiente';
  driverUuid: string | null = null;
  addressUuid: string | undefined = undefined;
  total: number;
}
