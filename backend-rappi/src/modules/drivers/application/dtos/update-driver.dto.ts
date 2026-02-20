import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateDriverDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsString()
  @IsOptional()
  vehicle?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}