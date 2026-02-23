import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { VendorOrmEntity } from '../../../vendors/infra/databases/vendor.orm-entity';
import { OrderItemOrmEntity } from '../../../orders/infra/databases/order-item.orm-entity';

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

  @Column({type: 'float'})
  price: number;

  @Column({nullable : true})
  photo: string;

  @Column()
  available: boolean;

  @Column({ type: 'uuid', name: 'vendor_uuid' })
  vendorUuid: string;

  @ManyToOne(() => VendorOrmEntity, vendor => vendor.products, { 
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vendor_uuid', referencedColumnName: 'uuid' }) 
  vendor: VendorOrmEntity;

  @OneToMany(() => OrderItemOrmEntity, (i) => i.product)
  items: OrderItemOrmEntity[];
}
