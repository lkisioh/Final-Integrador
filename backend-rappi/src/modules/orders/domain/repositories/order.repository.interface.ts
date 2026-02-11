import { OrderEntity } from '../domain/entities/order.entity'
import { UpdateOrderDto } from '../../application/dtos/update-order.dto'

export interface IOrderRepository {
 findAll(): Promise<OrderEntity[]>;
 save(order: OrderEntity): Promise<OrderEntity>;
 update(orderUuid: string, data: UpdateOrderDto): Promise<OrderEntity>;
 delete(orderUuid: string): Promise<void>;
 findByUuid(orderUuid: string): Promise<OrderEntity | null>;
 findByVendorUuid(vendorUuid: string): Promise<OrderEntity[]>;
 findByUserUuid(userUuid: string): Promise<OrderEntity[]>;
 findByDriverUuid(driverUuid: string): Promise<OrderEntity[]>;
}
