import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { VendorOrmEntity } from 'src/modules/vendors/infra/databases/vendor.orm-entity';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { DriverOrmEntity } from 'src/modules/drivers/infra/databases/driver.orm-entity';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity({ name: 'orders' })
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ type: 'uuid', name: 'user_uuid' })
  userUuid: string;

  @ManyToOne(() => UserOrmEntity, user => user.orders, { 
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserOrmEntity;

  @Column({ nullable: true })
  userName: string;

  @Column()
  userOrderAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'uuid', name: 'vendor_uuid' })
  vendorUuid: string;

  @ManyToOne(() => VendorOrmEntity, vendor => vendor.orders, { 
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vendor_uuid', referencedColumnName: 'uuid' })
  vendor: VendorOrmEntity;

  @Column()
  vendorName: string;

  @OneToMany(() => OrderItemOrmEntity, (i) => i.order, { cascade: true, eager: true })
  items: OrderItemOrmEntity[];

  @Column()
  status: string;

  @Column({ type: 'uuid', name: 'driver_uuid', nullable: true })
  driverUuid: string | null;
  @ManyToOne(() => DriverOrmEntity, driver => driver.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'driver_uuid', referencedColumnName: 'uuid' })
  driver: DriverOrmEntity | null;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
