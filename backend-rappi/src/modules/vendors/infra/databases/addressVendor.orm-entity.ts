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

  @OneToOne(() => VendorOrmEntity, (vendor) => vendor.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_uuid', referencedColumnName: 'uuid' })
  vendor: VendorOrmEntity;

  @Column({ name: 'vendor_uuid', type: 'uuid' })
  vendorUuid: string;
}
