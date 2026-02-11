import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {

  // Unicos Datos a modificar cero yo
  @IsString()
  @IsNotEmpty()
  address: string;

  
  @IsNotEmpty()
  items: any[]; 

  @IsString()
  @IsNotEmpty()
  status: string;  


  @IsNumber()
  @IsNotEmpty()
  total: number

}