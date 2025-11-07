import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString() //Direccion de la img si hubiera en bbdd
  photo: string;

  @IsBoolean()
  available: boolean;
}