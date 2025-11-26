import { IsString, IsEmail } from 'class-validator';

export class CreateAddressDto {
  street: string;
  number?: number;
  apartment?: string;
}

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  password: string;
  addresses?: CreateAddressDto[];
}
