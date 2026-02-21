import { VendorEntity } from '../entities/vendor.entity';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

export const VENDOR_REPO = Symbol('VENDOR_REPO');
export interface IVendorRepository {
  findById(id: number): Promise<VendorEntity | null>;
  findByEmail(email: string): Promise<VendorEntity | null>;
  findByUuid(uuid: string): Promise<VendorEntity | null>;
  createVendor(vendor: CreateVendorDto): Promise<VendorEntity | string>;
  findAll(): Promise<VendorEntity[] | string>;
  delete(uuid: string): Promise<string>;
  update(uuid: string, dto: UpdateVendorDto): Promise<VendorEntity | string>;
}
