import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  userUuid: string;

  @IsNumber()
  phone: number;

  @IsString()
  vehicle: string;

  @IsString()
  location: string;

  @IsBoolean()
  available: boolean;
}
