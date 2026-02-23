import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressOrmEntity } from './address.orm-entity';
import { OrderOrmEntity } from '../../../orders/infra/databases/order.orm-entity';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => AddressOrmEntity, address => address.user, { cascade: true, eager: true })
  addresses: AddressOrmEntity[];

  @OneToMany(() => OrderOrmEntity, (order) => order.user, { cascade: true, eager: true })
  orders: OrderOrmEntity[];
}
