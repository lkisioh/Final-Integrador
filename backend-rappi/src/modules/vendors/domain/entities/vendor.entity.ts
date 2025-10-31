import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { AddressEntity } from './addressVendor.entity';

export class VendorEntity {
  public readonly id: number;
  public readonly uuid: string;
  public readonly userId: number;
  public marketName: string;
  public category: string;
  public daysOpen: string;
  public time: string;
  public email: string;
  public phone: number;
  public products: ProductEntity[] = [];
  public address: AddressEntity;
}
