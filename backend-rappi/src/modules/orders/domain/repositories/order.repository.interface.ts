import { OrderEntity } from '../entities/order.entity';
export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]>;
  save(order: OrderEntity): Promise<OrderEntity>;
  //update(orderUuid: string, data: UpdateOrderDto): Promise<OrderEntity>;
  //updateOrder(uuid:string,status:string,driverUuid:string,driverNombre:string)
  //delete(orderUuid: string): Promise<void>;
  //findByUuid(orderUuid: string): Promise<OrderEntity | null>;
  //findByVendorUuid(vendorUuid: string): Promise<OrderEntity[]>;
  //findByUserUuid(userUuid: string): Promise<OrderEntity[]>;
  //findByDriverUuid(driverUuid: string): Promise<OrderEntity[]>;
}
