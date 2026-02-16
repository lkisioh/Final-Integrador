import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  orderUuid: string;

  @IsString()
  @IsNotEmpty()
  productUuid: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;
}
