import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressVendorDto } from './address.dto';
import { CreateProductDto } from 'src/modules/products/application/dtos/create-product.dto';

export class CreateVendorDto {
  @IsString()
  name: string;
  @IsString()
  category: string;
  //horario
  @IsString()
  daysOpen: string;
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
  // Faltaría calificaciones y reseñas
}
