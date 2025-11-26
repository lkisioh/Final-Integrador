import { DriverOrmEntity } from './infra/databases/driver.orm-entity';
import { DriverRepositoryImpl } from './infra/repositories/driver.repository.impl';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateDriverUseCase } from './application/use-cases/create-driver.usecase';
import { DriverController } from './infra/controllers/driver.contoller';
import { IDriverRepository } from './domain/repositories/driver.repository.interface';
import { DRIVER_REPO } from './domain/repositories/driver.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DriverOrmEntity])],
  controllers: [DriverController],
  providers: [
    { provide: DRIVER_REPO, useClass: DriverRepositoryImpl },
    {
      provide: 'IDriverRepository',
      useClass: DriverRepositoryImpl,
    },
    {
      provide: CreateDriverUseCase,
      useFactory: (driverRepo: IDriverRepository) =>
        new CreateDriverUseCase(driverRepo),
      inject: ['IDriverRepository'],
    },
  ],
  exports: [DRIVER_REPO, 'IDriverRepository'],
})
export class DriversModule {}
