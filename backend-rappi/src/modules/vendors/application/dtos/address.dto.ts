import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAddressVendorDto {
  @IsString()
  street: string;

  @IsNumber()
  @IsOptional()
  number?: number;
}
