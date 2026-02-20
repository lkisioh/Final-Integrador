import { IsOptional, IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../dtos/address.dto';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];
}