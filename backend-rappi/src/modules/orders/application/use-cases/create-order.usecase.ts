import { Injectable } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(dto: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = new OrderEntity();
    newOrder.userUuid = dto.userUuid;
    newOrder.userName = dto.userName;
    newOrder.userOrderAddress = dto.userOrderAddress;
    newOrder.vendorUuid = dto.vendorUuid;
    newOrder.vendorName = dto.vendorName;
    newOrder.items = dto.items;
    newOrder.status = dto.status;
    newOrder.driverUuid = dto.driverUuid || null;

    newOrder.total = dto.total;

    return await this.orderRepo.save(newOrder);
  }
}
