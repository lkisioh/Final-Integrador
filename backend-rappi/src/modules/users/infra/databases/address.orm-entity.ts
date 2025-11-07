import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity({ name: 'addresses' })
export class AddressOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  @Column({ nullable: true })
  number?: number;

  @Column({ nullable: true })
  apartment?: string;

  @ManyToOne(() => UserOrmEntity, user => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;
}