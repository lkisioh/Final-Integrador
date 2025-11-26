import { VendorEntity } from '../entities/vendor.entity';
export const VENDOR_REPO = Symbol('VENDOR_REPO');
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';
export interface IVendorRepository {
  findById(id: number): Promise<VendorEntity | null>;
  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  findByUuid(uuid: string): Promise<VendorEntity | null>;
  save(vendor: CreateVendorDto): Promise<VendorEntity>;
  findAll(): Promise<VendorEntity[]>;
  //pdate(uuid: string, dto: UpdateVendorDto): Promise<VendorEntity>;
}
