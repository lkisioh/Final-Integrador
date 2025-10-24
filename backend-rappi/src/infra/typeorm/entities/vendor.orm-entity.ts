import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vendors' })
export class VendorOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

}