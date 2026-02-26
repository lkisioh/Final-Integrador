import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DriverOrmEntity } from '../databases/driver.orm-entity';

import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { DriverEntity } from '../../domain/entities/driver.entity';
import { UpdateDriverDto } from '../../application/dtos/update-driver.dto';
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

  async findByEmail(email: string): Promise<DriverEntity | null> {
    const driver = await this.driverRepo.findOne({ where: { email } });
    if (!driver) return null;
    const domainDriver = new DriverEntity();
    Object.assign(domainDriver, driver);
    return domainDriver;
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

  async findByUuid(uuid: string): Promise<DriverEntity | null> {
  const entity = await this.driverRepo.findOne({ where: { uuid } });
  if (!entity) return null;

  const driver = new DriverEntity();
  Object.assign(driver, entity);
  return driver;
}

  async update(uuid: string, dto: UpdateDriverDto): Promise<DriverEntity | string> {
  const entity = await this.driverRepo.findOne({ where: { uuid } });
  if (!entity) return `No se encontró Driver con uuid: ${uuid}`;

  entity.name = dto.name ?? entity.name;
  entity.email = dto.email ?? entity.email;
  entity.phone = dto.phone ?? entity.phone;
  entity.vehicle = dto.vehicle ?? entity.vehicle;
  entity.location = dto.location ?? entity.location;
  if (dto.password) entity.password = dto.password;

  const saved = await this.driverRepo.save(entity);

  const domainDriver = new DriverEntity();
  Object.assign(domainDriver, saved);
  return domainDriver;
}

  async delete(uuid: string): Promise<void> {
    const entity = await this.driverRepo.findOne({ where: { uuid } });
    if (!entity) {
      throw new Error('No se encontró Driver con uuid: ' + uuid);
    }
    await this.driverRepo.remove(entity);
  }
  async updatePasswordHash(uuid: string, passwordHash: string): Promise<void> {
    await this.driverRepo.update({ uuid }, { password: passwordHash });
  }
}
