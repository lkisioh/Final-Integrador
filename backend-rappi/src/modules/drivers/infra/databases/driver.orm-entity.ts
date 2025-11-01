import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';

@Entity({ name: 'drivers' })
export class DriverOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  phone: number;

  @Column()
  vehicle: string;

  @Column()
  location: string;

  @Column()
  available: boolean;

  @OneToOne(() => UserOrmEntity, user => user.driver, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_Uuid' })
  user_id: UserOrmEntity;
}
