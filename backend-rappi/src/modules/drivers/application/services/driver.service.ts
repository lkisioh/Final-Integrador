import { Injectable, Inject } from '@nestjs/common';

import type { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { CreateDriverUseCase } from '../use-cases/create-driver.usecase';

@Injectable()
export class DriverService {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    @Inject('IDriverRepository')
    private readonly driverRepository: IDriverRepository,
  ) {}

  create(createDriverDto) {
    return this.createDriverUseCase.execute(createDriverDto);
  }
}
