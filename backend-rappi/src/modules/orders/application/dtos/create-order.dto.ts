import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

  @IsString()
  @IsNotEmpty()
  userUuid: string;  
  
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  
  @IsNotEmpty()
  createAt: Date;

   @IsString()
  @IsNotEmpty()
  vendorUuid: string;  
  
  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsNotEmpty()
  items: any[]; // FALTARIA RELACIONAR LOS DTO CON DATOS NECESARIO

  @IsString()
  @IsNotEmpty()
  status: string;  

   @IsString()
  @IsNotEmpty()
  driverUuid: string;  
  
  @IsString()
  @IsNotEmpty()
  driverName: string;


  @IsNumber()
  @IsNotEmpty()
  total: number

}
