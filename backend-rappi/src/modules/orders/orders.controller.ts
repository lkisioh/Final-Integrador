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
  findAll(
    @Query('status') status: string,
    @Query('storeId') storeId: string,
    @Query('userUuid') userUuid: string
  ) {
    return this.ordersService.findAll(status, storeId, userUuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() body: any) {
    return this.ordersService.updateStatus(
      uuid, 
      body.status, 
      body.driverUuid, 
      body.driverNombre
    );
  }
}