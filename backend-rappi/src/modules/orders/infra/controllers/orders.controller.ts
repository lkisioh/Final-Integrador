import { Controller, Get, Post, Body, Patch, Param, Query, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto'
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';

@Controller('orders') 
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('IProductRepository')
    private readonly orderRepository: IOrderRepository,

  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDtp) {
    return await this.createOrderUseCase.execute(dto);
  }

  //  falta de aca para abajo
  // ACOMODAR FILTRO O SEPARARLO POR LOGICA DE QUERY POR SI TIENEN DEVOLUCIONES DISTEINTAS
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
  @Get() 
 async findAllByVendor(@Param('vendorUuid') vendorUuid: string ) {
      const products = await this.productRepository.findByVendorUuid(vendorUuid); 
      return products;
 }
 @Get(':productUuid') 
    async findOne(@Param('productUuid') productUuid: string) {
        
        const product = await this.productRepository.findByUuid(productUuid); 
        
        if (!product) {
            throw new Error(`Product con UUID ${productUuid} no encontrado`);
        }
        
        return product;
    }
  @Post()
 async create(@Param('vendorUuid') vendorUuid: string, @Body() dto: CreateProductDto) {
     return await this.createProductUseCase.execute(dto, vendorUuid);
 }
 @Delete(':productUuid')
 async delete(@Param('productUuid') productUuid: string) {
     return await this.deleteProductUseCase.execute(productUuid);
 }
  @Patch(':productUuid')
  async update(@Param('productUuid') productUuid: string, @Body() dto: UpdateProductDto) : Promise<ProductEntity> {
      return await this.updateProductUseCase.execute(productUuid, dto);
  }
}