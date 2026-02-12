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
    newOrder.userOrderAddress = dto.address;
    newOrder.createdAt = dto.createAt;
    newOrder.vendorUuid = dto.vendorUuid;
    newOrder.vendorName = dto.vendorName;
    // hay quee mapear los products que llegan, mirar vendor dto y usecase
    newOrder.products = dto.products;

    newOrder.status = dto.status;
    newOrder.driverUuid = dto.driverUuid;
    newOrder.driverName = dto.driverName;

    newOrder.total = dto.total;

    return await this.orderRepo.save(newOrder);
  }
}
