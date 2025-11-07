import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  number?: number;

  @IsString()
  @IsOptional()
  apartment?: string;
}
