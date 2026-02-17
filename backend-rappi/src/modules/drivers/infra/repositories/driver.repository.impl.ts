import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DriverOrmEntity } from '../databases/driver.orm-entity';

import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { DriverEntity } from '../../domain/entities/driver.entity';

@Injectable()
export class DriverRepositoryImpl implements IDriverRepository {
  private drivers: any[] = [];
  constructor(
    @InjectRepository(DriverOrmEntity)
    private readonly driverRepo: Repository<DriverOrmEntity>,
  ) {}

  async findAll(): Promise<DriverEntity[]> {
    const entities = await this.driverRepo.find();

    return entities.map(entity => {
      const driver = new DriverEntity();
      Object.assign(driver, {
        id: entity.id,
        uuid: entity.uuid,
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        vehicle: entity.vehicle,
        location: entity.location,
        available: entity.available,
      });
      return driver;
    });
  }

  async findByEmail(email: string, password: string): Promise<{ uuid: string, name: string } | null> {
    const driver = await this.driverRepo.findOne({ where: { email, password } });
    if (!driver) return null;
    return { uuid: driver.uuid, name: driver.name };
  }
  async save(driver: DriverEntity): Promise<DriverEntity> {
    const ormDriver = this.driverRepo.create({
      uuid: driver.uuid ?? uuidv4(),
      name: driver.name,
      email: driver.email,
      password: driver.password,
      phone: driver.phone,
      vehicle: driver.vehicle,
      location: driver.location,
      available: driver.available,
    });

    const saved = await this.driverRepo.save(ormDriver);

    // Devolvemos al dominio
    const domainDriver = new DriverEntity();
    Object.assign(domainDriver, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      email: saved.email,
      password: saved.password,
      phone: saved.phone,
      vehicle: saved.vehicle,
      location: saved.location,
      available: saved.available,
    });

    return domainDriver;
  }

  async findById(id: number): Promise<DriverEntity | null> {
    const entity = await this.driverRepo.findOne({ where: { id } });
    if (!entity) return null;

    const driverFind = new DriverEntity();
    Object.assign(driverFind, {
      id: entity.id,
      uuid: entity.uuid,
      phone: entity.phone,
      vehicle: entity.vehicle,
      location: entity.location,
      available: entity.available,
    });

    return driverFind;
  }

  async delete(uuid: string): Promise<void> {
    const entity = await this.driverRepo.findOne({ where: { uuid } });
    if (!entity) {
      throw new Error('No se encontró Driver con uuid: ' + uuid);
    }
    await this.driverRepo.remove(entity);
  }
}
