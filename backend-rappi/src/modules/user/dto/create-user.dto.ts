
import { IsNotEmpty,IsEmail } from "class-validator";
import { CreateAddressDto } from "src/shared/dtos/create-address.dto";

export class CreateUserDto {

      @IsNotEmpty()
      name: string;

      @IsEmail()
      email: string;

      @IsNotEmpty()
      password: string; 

      addresses?: CreateAddressDto[];
}
