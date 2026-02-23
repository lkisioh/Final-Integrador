import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { CreateAddressVendorDto } from './address.dto';
import { CreateProductDto } from '../../../products/application/dtos/create-product.dto';

export class UpdateVendorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  daysOpen?: string;

  // En Vue lo mandamos como Array, así que acá debe ser string[] o any
  @IsOptional()
  time?: string[]; 

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsArray()
  @IsOptional()
  products?: CreateProductDto[];

  @IsOptional()
  address?: CreateAddressVendorDto;

  @IsString()
  @IsOptional()
  password?: string;
}
