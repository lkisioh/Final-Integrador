import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto {
  
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}