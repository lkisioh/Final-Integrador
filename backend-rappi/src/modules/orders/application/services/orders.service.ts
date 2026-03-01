import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../use-cases/create-order.usecase';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { CheckoutDto } from '../dtos/checkout.dto';
import { PaymentOrmEntity } from '../../../payments/infra/databases/payment.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @InjectRepository(PaymentOrmEntity)
    private readonly paymentRepository: any,
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

  async processCheckout(dto: CheckoutDto) {
  
  const totalGeneral = dto.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const nuevoPago = await this.paymentRepository.save({
    totalAmount: totalGeneral,
    method: dto.paymentMethod,
    status: 'PENDING'
  });

  const productosPorTienda: any = dto.items.reduce((groups, item) => {
    const vendorId = item.vendorId;
    if (!groups[vendorId]) {
      groups[vendorId] = [];
    }
    groups[vendorId].push(item);
    return groups;
  }, {});

  const registrosDeOrdenes: OrderEntity[] = [];

  for (const vendorId in productosPorTienda) {
    const itemsDeEstaTienda = productosPorTienda[vendorId];
    
    const totalDeEstaOrden = itemsDeEstaTienda.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const nuevaOrden = new OrderEntity();
    nuevaOrden.userUuid = dto.userUuid;
    nuevaOrden.userOrderAddress = dto.addressUuid;
    nuevaOrden.vendorUuid = vendorId;
    nuevaOrden.total = totalDeEstaOrden;
    nuevaOrden.paymentId = nuevoPago.uuid;
    nuevaOrden.items = itemsDeEstaTienda;
    nuevaOrden.status = 'pendiente';

    const ordenGuardada = await this.orderRepository.save(nuevaOrden);
    
    registrosDeOrdenes.push(ordenGuardada);
  }

  return {
    payment: nuevoPago,
    orders: registrosDeOrdenes
  };
}
}
