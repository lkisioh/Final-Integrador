import { OrderEntity } from '../entities/order.entity';
export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]>;
  save(order: OrderEntity): Promise<OrderEntity>;
  updateStatus(uuid: string, status: string): Promise<OrderEntity>;
  assignDriver(uuid:string,status:string,driverUuid:string): Promise<OrderEntity>;
  finishDelivery(uuid:string,status:string,driverUuid:string): Promise<OrderEntity>;
  //update(orderUuid: string, data: UpdateOrderDto): Promise<OrderEntity>;
  //delete(orderUuid: string): Promise<void>;
  //findByUuid(orderUuid: string): Promise<OrderEntity | null>;
  //findByVendorUuid(vendorUuid: string): Promise<OrderEntity[]>;
  //findByUserUuid(userUuid: string): Promise<OrderEntity[]>;
  //findByDriverUuid(driverUuid: string): Promise<OrderEntity[]>;
}
