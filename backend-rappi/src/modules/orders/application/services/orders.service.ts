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

  private groupByVendor(items: any[]) {
  return items.reduce((acc, item) => {
    const vendorId = item.vendorId || item.vendorUuid; 
    if (!acc[vendorId]) {
      acc[vendorId] = [];
    }
    acc[vendorId].push(item);
    return acc;
  }, {});
}

  async processCheckout(dto: CheckoutDto) {
  const subtotal = dto.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let factor = 1.0; 
  if (dto.paymentMethod === 'CASH') {
    factor = 0.90; 
  } else if (dto.paymentMethod === 'CARD') {
    factor = 1.10; 
  }

  const totalConAjuste = subtotal * factor;

  const nuevoPago = await this.paymentRepository.save({
    totalAmount: totalConAjuste,
    method: dto.paymentMethod,
    status: 'PAID', 
    createdAt: new Date()
  });

  const itemsByVendor = this.groupByVendor(dto.items);

  for (const vendorId in itemsByVendor) {
  const itemsDeEstaTienda = itemsByVendor[vendorId];
  const subtotalTienda = itemsDeEstaTienda.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  await this.orderRepository.save({
    vendorUuid: vendorId, 
    userUuid: dto.userUuid,
    addressUuid: dto.addressUuid,
    total: subtotalTienda * factor, 
    paymentId: String(nuevoPago.id), 
    status: 'pendiente', 
    
    items: itemsDeEstaTienda.map(item => ({
      productUuid: item.productId, 
      quantity: item.quantity,
      price: item.price
    }))
  });
}

  return { message: 'Compra procesada', paymentId: nuevoPago.id, totalFinal: totalConAjuste };
}
}
