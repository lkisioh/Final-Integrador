import { VendorEntity } from '../entities/vendor.entity';

export interface IVendorRepository {
  findById(id: number): Promise<VendorEntity | null>;
  findByUuid(uuid: string): Promise<VendorEntity | null>;
  save(vendor: VendorEntity): Promise<VendorEntity>;
}
