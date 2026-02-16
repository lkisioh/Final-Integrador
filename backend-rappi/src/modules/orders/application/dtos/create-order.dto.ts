import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

import { CreateOrderItemDto } from './create-order-item.dto';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userUuid: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userOrderAddress: string;

  @IsString()
  @IsNotEmpty()
  vendorUuid: string;

  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsNotEmpty()
  items: CreateOrderItemDto[];

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  driverUuid?: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}
