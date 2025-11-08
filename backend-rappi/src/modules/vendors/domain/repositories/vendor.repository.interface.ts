import { VendorEntity } from '../entities/vendor.entity';

export interface IVendorRepository {
  findById(id: number): Promise<VendorEntity | null>;
  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  findByUuid(uuid: string): Promise<VendorEntity | null>;
  save(vendor: VendorEntity): Promise<VendorEntity>;
  findAll(): Promise<VendorEntity[]>;
}
