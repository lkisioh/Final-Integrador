import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VendorOrmEntity } from 'src/modules/vendors/infra/databases/vendor.orm-entity';

@Entity({ name: 'products' })
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  photo: string;

  @Column()
  available: boolean;

  @ManyToOne(() => VendorOrmEntity, vendor => vendor.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_uuid' })
  vendor_uuid: VendorOrmEntity;
}
