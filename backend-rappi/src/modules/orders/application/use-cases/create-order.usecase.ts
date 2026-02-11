import { Injectable } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(
    dto: CreateOrderDto, 
    ): Promise<orderEntity> {
  const newOrder = new OrderEntity();
    
  newOrder.userUuid: dto.userUuid;
  newOrder.userName: dto.userName;
  newOrder.address: dto.address;
  newOrder.createdAt: dto.createdAt;
  newOrder.vendorUuid: dto.vendorUuid;
  newOrder.vendorName: dto.vendorName;
  // hay quee mapear los products que llegan, mirar vendor dto y usecase
  newOrder.items:dto.items;

  newOrder.status: dto.status;
  newOrder.driverUuid: dto.driverUuid;
  newOrder.driverName: dto.driverName;

  newOrder.total: dro.total;

  return await this.orderRepo.save(newOrder);
 }
}
