import { Controller, Post, Patch, Body, Delete, Param, Get } from '@nestjs/common';
import { CreateDriverUseCase } from '../../application/use-cases/create-driver.usecase';
import { CreateDriverDto } from '../../application/dtos/create-driver.dto';
import type { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { Inject } from '@nestjs/common';
import { UpdateDriverDto } from '../../application/dtos/update-driver.dto';
@Controller('drivers')
export class DriverController {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    @Inject('IDriverRepository') // Usamos el repositorio directamente para no romper el módulo
    private readonly driverRepo: IDriverRepository,
  ) {}

  @Get()
  async findAll() {
    return await this.driverRepo.findAll();
  }
  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const driver = await this.driverRepo.findByUuid(uuid); 
    if (!driver) {
       throw new Error('Driver no encontrado');
    }
    return driver;
  }
  
  @Post()
  async create(@Body() dto: CreateDriverDto) {
    return await this.createDriverUseCase.execute(dto);
  }

  @Patch(':uuid')
async update(
  @Param('uuid') uuid: string, 
  @Body() updateDriverDto: UpdateDriverDto 
) {
  return this.driverRepo.update(uuid, updateDriverDto);
}

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.driverRepo.delete(uuid);
    return { message: 'Driver eliminado correctamente' };
  }
}