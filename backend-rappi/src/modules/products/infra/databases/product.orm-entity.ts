import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VendorOrmEntity } from 'src/modules/vendors/infra/databases/vendor.orm-entity';
import { OrderOrmEntity } from 'src/modules/orders/infra/databases/order.orm-entity';

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

  @ManyToOne(() => OrderOrmEntity, order => order.products, { 
    onDelete: 'CASCADE',
  })
  orders: OrderOrmEntity[];
}
