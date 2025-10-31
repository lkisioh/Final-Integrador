import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToOne, OneToMany} from 'typeorm';
import { AddressVendorOrmEntity } from './addressVendor.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';

@Entity({ name: 'vendors' })
export class VendorOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  marketName: string;

  @Column()
  category: string;

  @Column()
  daysOpen: string;

  @Column()
  time: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ProductOrmEntity, product => product.vendor_id, { cascade: true, eager: true })
  products: ProductOrmEntity[];

  @OneToOne(() => AddressVendorOrmEntity, address => address.vendor, { cascade: true, eager: true })
  address: AddressVendorOrmEntity[];
}
