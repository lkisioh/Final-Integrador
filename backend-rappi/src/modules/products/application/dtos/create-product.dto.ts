import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  vendorUuid: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString() //Direccion de la img si hubiera en bbdd
  photo: string = 'photourl';

  @IsBoolean()
  available: boolean = true;
}
