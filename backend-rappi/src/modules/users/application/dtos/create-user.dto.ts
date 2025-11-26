import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsString()
  apartment?: string;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: CreateAddressDto[];
}
