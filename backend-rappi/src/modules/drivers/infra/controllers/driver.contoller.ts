import {
  Controller,
  Post,
  Patch,
  Body,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateDriverUseCase } from '../../application/use-cases/create-driver.usecase';
import { CreateDriverDto } from '../../application/dtos/create-driver.dto';
import type { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { Inject } from '@nestjs/common';
import { UpdateDriverDto } from '../../application/dtos/update-driver.dto';

// para seguridad

import { JwtAuthGuard } from 'src/modules/auth/application/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/application/decorators/public.decorator';
import { DriverUserOwnershipGuard } from 'src/modules/auth/application/guards/driver-ownership.guard';

@Controller('drivers')
export class DriverController {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    @Inject('IDriverRepository') // Usamos el repositorio directamente para no romper el módulo
    private readonly driverRepo: IDriverRepository,
  ) {}

  // parte ADMIN
  /*@Get()
  async findAll() {
    return await this.driverRepo.findAll();
  }*/

  @Public()
  @Post()
  async create(@Body() dto: CreateDriverDto) {
    return await this.createDriverUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard, DriverUserOwnershipGuard)
  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const driver = await this.driverRepo.findByUuid(uuid);
    if (!driver) {
      throw new Error('Driver no encontrado');
    }
    return driver;
  }

  @UseGuards(JwtAuthGuard, DriverUserOwnershipGuard)
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driverRepo.update(uuid, updateDriverDto);
  }

  @UseGuards(JwtAuthGuard, DriverUserOwnershipGuard)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.driverRepo.delete(uuid);
    return { message: 'Driver eliminado correctamente' };
  }
}
