import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderOrmEntity } from '../../../orders/infra/databases/order.orm-entity';
import { PaymentMethod, PaymentStatus } from '../../domain/enums/payment-method.enum';

@Entity({ name: 'payments' })
export class PaymentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'varchar',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  method: PaymentMethod;

  @Column({
    type: 'varchar',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderOrmEntity, (order) => order.payment)
  orders: OrderOrmEntity[];
}