import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateAddressVendorDto } from './address.dto';
import { CreateProductDto } from '../../../products/application/dtos/create-product.dto';

export class CreateVendorDto {
  @IsString()
  name: string;
  @IsString()
  category: string;
  //horario
  @IsString()
  daysOpen: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.join(', ');
    return value;
  }, { toClassOnly: true })
  @IsString()
  time: string;
  //contacto
  @IsEmail()
  email: string;
  @IsNumber()
  phone: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  @IsOptional()
  products?: CreateProductDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateAddressVendorDto)
  @IsOptional()
  address?: CreateAddressVendorDto;

  @IsString()
  password: string;
  
}
