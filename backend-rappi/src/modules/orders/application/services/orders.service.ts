import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../use-cases/create-order.usecase';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  // async updateStatus (uuid: string,
  // status: string,
  // driverUuid?: string,
  // driverNombre?: string){
  //   return this.orderRepository.update(uuid,status,driverUuid,driverNombre);
  // }
}
