import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AddressOrmEntity } from './address.orm-entity';
import { DriverOrmEntity } from 'src/modules/drivers/infra/databases/driver.orm-entity';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => AddressOrmEntity, address => address.user, { cascade: true, eager: true })
  addresses: AddressOrmEntity[];

  @OneToOne(() => DriverOrmEntity, driver => driver.user_id, { cascade: true, eager: true })
  driver: DriverOrmEntity;
}
