import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../typeorm/entities/user.orm-entity';
import { VendorOrmEntity } from '../typeorm/entities/vendor.orm-entity';
import { ProductOrmEntity } from '../typeorm/entities/product.orm-entity';
import { OrderOrmEntity } from '../typeorm/entities/order.orm-entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/rappi.sqlite', 
  entities: [UserOrmEntity, VendorOrmEntity, ProductOrmEntity, OrderOrmEntity],
  synchronize: true,  
  logging: false,
});