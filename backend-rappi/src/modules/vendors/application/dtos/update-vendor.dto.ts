import { CreateAddressVendorDto } from './address.dto';
import { CreateProductDto } from 'src/modules/products/application/dtos/create-product.dto';

export class UpdateVendorDto {
  name: string;
  category: string;
  daysOpen: string;
  time: string;
  email: string;
  phone: number;
  products?: CreateProductDto[];
  address?: CreateAddressVendorDto;
  password: string;
}
