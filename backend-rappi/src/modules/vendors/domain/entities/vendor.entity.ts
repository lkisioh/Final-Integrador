import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { AddressVendorEntity } from './addressVendor.entity';

export class VendorEntity {
  public readonly id: number;
  public readonly uuid: string;
  public name: string;
  public category: string;
  public daysOpen: string;
  public time: string;
  public email: string;
  public phone: number;
  public products: ProductEntity[] = [];
  public address: AddressVendorEntity;
  public role: string = 'vendor';
  public password: string;
}
