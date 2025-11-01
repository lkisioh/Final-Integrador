import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { VendorOrmEntity } from './vendor.orm-entity';

@Entity({ name: 'addressesVendors' })
export class AddressVendorOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: number;
  // FK column that stores the vendor UUID (domain uses vendorUuid: string)
  @Column({ name: 'vendor_uuid', nullable: true })
  vendorUuid: string;

  // Relation to the Vendor ORM entity (owner side). We join using the vendor's `uuid` column.
  @OneToOne(() => VendorOrmEntity, (vendor) => vendor.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_uuid', referencedColumnName: 'uuid' })
  vendor: VendorOrmEntity;
}
