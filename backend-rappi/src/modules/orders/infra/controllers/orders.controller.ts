import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { CheckoutDto } from '../../application/dtos/checkout.dto';
import { OrdersService } from '../../application/services/orders.service';

// seguridad
import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { ActorTypesGuard } from 'src/modules/auth/application/guards/actor-types.guard';
import { ActorTypes } from 'src/modules/auth/application/types/actor-types.decorator';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('final-user')
  @Post()
  async Create(@Body() dto: CreateOrderDto) {
    return await this.createOrderUseCase.execute(dto);
  }
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('driver')
  @Get()
  findAll() {
    return this.orderRepository.findAll();
  }
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('vendor')
  @Get('/vendor/:vendorUuid')
  findAllByVendor(@Param('vendorUuid') vendorUuid: string) {
    return this.orderRepository.findByVendorUuid(vendorUuid);
  }

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('driver')
  @Get('/driver/:driverUuid')
  findAllByDriver(@Param('driverUuid') driverUuid: string) {
    return this.orderRepository.findByDriverUuid(driverUuid);
  }

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @ActorTypes('final-user')
  @Get('/user/:userUuid')
  findAllByFinalUser(@Param('userUuid') userUuid: string) {
    return this.orderRepository.findByUserUuid(userUuid);
  }

  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @Patch(':uuid')
  updateOrder(@Param('uuid') uuid: string, @Body() body: any) {
    return this.orderRepository.updateStatus(uuid, body.status);
  }
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @Patch(':uuid/assign-driver')
  assignDriver(@Param('uuid') uuid: string, @Body() body: any) {
    return this.orderRepository.assignDriver(uuid, body.status, body.driverUuid);
  }
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @Patch(':uuid/finish-delivery')
  finishDelivery(@Param('uuid') uuid: string, @Body() body: any) {
    return this.orderRepository.finishDelivery(uuid, body.status, body.driverUuid);
  }

  //fede
  @UseGuards(JwtAuthGuard, ActorTypesGuard)
  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    try {
      const result = await this.ordersService.processCheckout(checkoutDto);
      return {
        message: '¡Compra finalizada con éxito!',
        payment: result.paymentId,
        //ordersGenerated: result.orders.length,
        totalFinal: result.totalFinal,
      };
    } catch (error) {
      throw new Error('Error al procesar la compra: ' + error.message);
    }
  }
}
