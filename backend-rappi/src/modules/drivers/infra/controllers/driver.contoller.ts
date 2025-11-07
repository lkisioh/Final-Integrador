import { Controller, Post, Body } from '@nestjs/common';
import { CreateDriverUseCase } from '../../application/use-cases/create-driver.usecase';
import { CreateDriverDto } from '../../application/dtos/create-driver.dto';
//import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Controller('drivers')
export class DriverController {
  constructor(private readonly createDriverUseCase: CreateDriverUseCase) {}

  @Post()
  async create(@Body() dto: CreateDriverDto) {
    return await this.createDriverUseCase.execute(dto);
  }
}
