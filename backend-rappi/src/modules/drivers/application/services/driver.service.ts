import { Injectable, Inject } from '@nestjs/common';

import type { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { CreateDriverUseCase } from '../use-cases/create-driver.usecase';
import { UpdateDriverDto } from '../dtos/update-driver.dto';
@Injectable()
export class DriverService {
  private drivers: any[] = [];
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    @Inject('IDriverRepository')
    private readonly driverRepository: IDriverRepository,
  ) {}

  create(createDriverDto) {
    return this.createDriverUseCase.execute(createDriverDto);
  }

  async delete(uuid: string) {
  const index = this.drivers.findIndex(d => d.uuid === uuid);
  if (index !== -1) {
    this.drivers.splice(index, 1);
    return { message: 'Driver eliminado correctamente' };
  }
  
  await this.driverRepository.delete(uuid);
  return { message: 'Driver eliminado correctamente' };

}

async update(uuid: string, updateDriverDto: UpdateDriverDto) {
  return this.driverRepository.update(uuid, updateDriverDto);
}
}
