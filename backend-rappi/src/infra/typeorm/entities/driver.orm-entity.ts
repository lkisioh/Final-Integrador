import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'drivers' })
export class DriverOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

}