import {
  IsEmail,
 IsNumber,
 IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { ProductDto } from 'src/modules/products/application/dtos/product.dto';

export class CreateVendorDto {

  @IsString()
  userUuid: string;
  @IsString()
  marketName: string;
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
  @Type(() => ProductDto)
  @IsOptional()
  products?: ProductDto[];

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;
  // Faltaría calificaciones y reseñas
}