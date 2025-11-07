import { Injectable } from '@nestjs/common';
import { DriverEntity } from '../../domain/entities/driver.entity';
import type { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { CreateDriverDto } from '../dtos/create-driver.dto';

@Injectable()
export class CreateDriverUseCase {
  constructor(private readonly driverRepo: IDriverRepository) {}

  async execute(dto: CreateDriverDto): Promise<DriverEntity> {
    const driver = new DriverEntity();
    driver.name = dto.name;
    driver.email = dto.email;
    driver.password = dto.password;
    driver.phone = dto.phone;
    driver.vehicle = dto.vehicle;
    driver.location = dto.location;
    driver.available = true;

    return await this.driverRepo.save(driver);
  }
}
