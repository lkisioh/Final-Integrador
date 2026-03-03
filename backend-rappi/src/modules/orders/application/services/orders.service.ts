import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../use-cases/create-order.usecase';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { CheckoutDto } from '../dtos/checkout.dto';
import { PaymentOrmEntity } from '../../../payments/infra/databases/payment.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { VendorOrmEntity } from 'src/modules/vendors/infra/databases/vendor.orm-entity';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { PaymentStatus } from 'src/modules/payments/domain/enums/payment-method.enum';
@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @InjectRepository(PaymentOrmEntity)
    private readonly paymentRepository: any,
    @InjectRepository(VendorOrmEntity)
    private readonly vendorRepository: any,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: any,
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
    const userData = await this.userRepository.findOne({ 
    where: { uuid: dto.userUuid }, 
    relations: ['addresses']
  });

const direccionEncontrada = userData?.addresses?.find(addr => addr.uuid === dto.addressUuid);

  const street = direccionEncontrada?.street || 'Calle desconocida';
  const number = direccionEncontrada?.number || '';
  const apt = direccionEncontrada?.apartment ? `, Depto: ${direccionEncontrada.apartment}` : '';

  const direccionTexto = `${street} ${number}${apt}`.trim();

  const subtotalGeneral = dto.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let factor = 1.0;
  if (dto.paymentMethod === 'CASH') factor = 0.90;
  else if (dto.paymentMethod === 'CARD') factor = 1.10;

  const totalConAjuste = subtotalGeneral * factor;

  const nuevoPago = await this.paymentRepository.save({
    totalAmount: totalConAjuste,
    method: dto.paymentMethod,
    status: PaymentStatus.APPROVED,
    createdAt: new Date()
  });

  const itemsByVendor = this.groupByVendor(dto.items);

  for (const vendorId in itemsByVendor) {
    const itemsDeEstaTienda = itemsByVendor[vendorId];
    
    const vendorData = await this.vendorRepository.findOne({ where: { uuid: vendorId } });

    const subtotalTienda = itemsDeEstaTienda.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    await this.orderRepository.save({
      userUuid: dto.userUuid,
      userName: userData?.name || 'Usuario', 
      userOrderAddress: direccionTexto, 
      vendorUuid: vendorId,
      vendorName: vendorData?.name || 'Tienda', 
      total: subtotalTienda * factor,
      paymentId: nuevoPago.uuid,
      paymentMethod: dto.paymentMethod,
      status: 'PENDIENTE',
      addressUuid: dto.addressUuid,
      
      items: itemsDeEstaTienda.map(item => ({
        productUuid: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.price * item.quantity
      }))
    } as any);
  }

  return { 
    message: 'Compra finalizada con éxito', 
    paymentId: nuevoPago.id, 
    totalFinal: totalConAjuste 
  };
}
}
