import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

}