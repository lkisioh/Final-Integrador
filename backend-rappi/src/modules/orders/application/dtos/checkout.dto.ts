import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../../../payments/domain/enums/payment-method.enum';

class CheckoutItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  vendorId: string; 

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CheckoutDto {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];

  @IsString()
  @IsNotEmpty()
  userUuid: string;

  @IsString()
  @IsNotEmpty()
  addressUuid: string;
}