import { IsString, IsNumber, IsBoolean, IsEmail } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  @IsNumber()
  phone: number;

  @IsString()
  vehicle: string;

  @IsString()
  location: string;

  @IsBoolean()
  available: boolean = true;
}
