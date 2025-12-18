import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('ordenes') 
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }

  @Get()
  findAll(@Query('status') status: string) {
    return this.ordersService.findAll(status);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() body: { status: string, driverUuid: string }) {
    return this.ordersService.updateStatus(uuid, body.status, body.driverUuid);
  }
}