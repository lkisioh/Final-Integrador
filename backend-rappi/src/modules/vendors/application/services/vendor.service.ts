import { Injectable, Inject } from '@nestjs/common';

import type { IVendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { CreateVendorUseCase } from '../use-cases/create-vendor.usecase';

@Injectable()
export class UserService {
  constructor(
    
    private readonly createVendorUseCase: CreateVendorUseCase,
    
    @Inject('IVendorRepository')
    private readonly userRepository: IVendorRepository,
  ) {}

  create(createVendorDto){
    return this.createVendorUseCase.execute(createVendorDto);
  }
}