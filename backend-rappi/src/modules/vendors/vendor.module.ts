import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VendorController } from './infra/contollers/vendor.controller';
import { VendorService } from './application/services/vendor.service';

import { VendorOrmEntity } from './infra/databases/vendor.orm-entity';
import { AddressVendorOrmEntity } from './infra/databases/addressVendor.orm-entity';

import { VendorRepositoryImpl } from './infra/repositories/vendor.repository.impl';
import { VENDOR_REPO } from './domain/repositories/vendor.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorOrmEntity, AddressVendorOrmEntity]),
  ],
  controllers: [VendorController],
  providers: [
    VendorService,
    { provide: VENDOR_REPO, useClass: VendorRepositoryImpl },
  ],
  exports: [VendorService, VENDOR_REPO],
})
export class VendorsModule {}
