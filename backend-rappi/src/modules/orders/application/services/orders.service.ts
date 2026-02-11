import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../use-cases/create-order.usecase';
import { CreateOrderDto } from '../dto/create-order.usecase';

@Injectable()
export class OrdersService {

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  create(createOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

}

