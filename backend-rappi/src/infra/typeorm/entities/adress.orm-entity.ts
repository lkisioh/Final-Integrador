import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Entity({ name: 'addresses' })
export class AddressOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  apartment: string;
 
  @ManyToOne(() => UserOrmEntity, (user) => user.addresses)
  user: UserOrmEntity;
}