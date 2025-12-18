import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateDriverUseCase } from '../../application/use-cases/create-driver.usecase';
import { CreateDriverDto } from '../../application/dtos/create-driver.dto';
// Importamos la interfaz del repositorio, que es lo que Nest ya conoce
import { Inject } from '@nestjs/common';

@Controller('drivers')
export class DriverController {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    @Inject('IDriverRepository') // Usamos el repositorio directamente para no romper el módulo
    private readonly driverRepo: any 
  ) {}

  @Post()
  async create(@Body() dto: CreateDriverDto) {
    return await this.createDriverUseCase.execute(dto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.driverRepo.delete(uuid);
    return { message: 'Driver eliminado correctamente' };
  }
}