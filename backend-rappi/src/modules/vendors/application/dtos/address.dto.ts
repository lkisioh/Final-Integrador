import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsNumber()
  @IsOptional()
  number?: number;

  @IsString()
  @IsOptional()
  apartment?: string;
}