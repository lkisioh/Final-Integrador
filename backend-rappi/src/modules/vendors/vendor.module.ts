import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorOrmEntity } from './infra/databases/vendor.orm-entity';
import { AddressVendorOrmEntity } from './infra/databases/addressVendor.orm-entity';
import { VendorRepositoryImpl } from './infra/repositories/vendor.repository.impl';
import { CreateVendorUseCase } from './application/use-cases/create-vendor.usecase';
import { VendorController } from './infra/contollers/vendor.controller';
import { IVendorRepository } from './domain/repositories/vendor.repository.interface';
@Module({
  imports: [TypeOrmModule.forFeature([VendorOrmEntity, AddressVendorOrmEntity])],
  controllers: [VendorController],
  providers: [
    {
      provide: 'IVendorRepository',
      useClass: VendorRepositoryImpl,
    },
    {
      provide: CreateVendorUseCase,
      useFactory: (vendorRepo: IVendorRepository) =>
        new CreateVendorUseCase(vendorRepo),
      inject: ['IVendorRepository'],
    },
  ],
  exports: ['IVendorRepository'],
})
export class VendorsModule {}
