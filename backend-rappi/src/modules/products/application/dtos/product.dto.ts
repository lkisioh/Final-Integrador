import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class ProductDto {
  @IsString()
  productName: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString() //Direccion de la img si hubiera en bbdd
  photo: string;

  @IsBoolean()
  available: boolean;
}