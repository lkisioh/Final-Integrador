import { OrderOrmEntity } from 'src/modules/orders/infra/databases/order.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';


@Entity({ name: 'drivers' })
export class DriverOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  vehicle: string;

  @Column()
  location: string;

  @Column()
  available: boolean;

  @OneToMany(() => OrderOrmEntity, (order) => order.driver, { cascade: true })
  orders: OrderOrmEntity[];
}
