import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  price: number;

  @IsString()
  @IsOptional() //Direccion de la img si hubiera en bbdd
  photo: string = 'photourl';

  @IsBoolean()
  @IsOptional()
  available: boolean = true;
}
