import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity({ name: 'addresses' })
export class AddressOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  number?: number;

  @Column({ nullable: true })
  apartment?: string;

  @ManyToOne(() => UserOrmEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user: UserOrmEntity;

  @Column({ nullable: true })
  user_uuid: string;
}
