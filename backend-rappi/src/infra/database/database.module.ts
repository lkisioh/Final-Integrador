import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../typeorm/entities/user.orm-entity';
import { DataSource } from 'typeorm';
import { AddressOrmEntity } from '../typeorm/entities/adress.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/rappi.sqlite',
      entities: [UserOrmEntity, AddressOrmEntity],
      synchronize: true,
    }),
    
  ],
  
})

export class DatabaseModule {}