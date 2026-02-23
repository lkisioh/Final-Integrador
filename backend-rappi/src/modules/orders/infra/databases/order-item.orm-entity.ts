import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { OrderOrmEntity } from './order.orm-entity';
import { ProductOrmEntity } from '../../../products/infra/databases/product.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderUuid: string;

  @ManyToOne(() => OrderOrmEntity, (o) => o.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderUuid', referencedColumnName: 'uuid' })
  order: OrderOrmEntity;

  @Column()
  productUuid: string;

  @ManyToOne(() => ProductOrmEntity, (p) => p.items, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'productUuid', referencedColumnName: 'uuid' })
  product: ProductOrmEntity;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'real' })
  unitPrice: number;

  @Column({ type: 'real' })
  subtotal: number;
}
