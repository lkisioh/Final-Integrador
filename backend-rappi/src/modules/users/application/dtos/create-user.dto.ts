import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
export class CreateUserDto {
  @IsString()
  uuid?: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsOptional()
  addresses?: AddressDto[];
}