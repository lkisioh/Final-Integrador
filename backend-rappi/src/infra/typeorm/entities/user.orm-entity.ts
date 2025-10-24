import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OneToMany } from 'typeorm';
import { AddressOrmEntity } from '../entities/adress.orm-entity';

// Tabla de BBDD

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  editedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
  

   @OneToMany(() => AddressOrmEntity, (address) => address.user, { cascade: true })
  addresses: AddressOrmEntity[];

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4(); 
  }
}