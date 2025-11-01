import { Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(uuid: string, dto: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepo.findByUuid(uuid);
    if (!existingUser) throw new Error('User not found');

    const updatedData = {
      ...existingUser,
      ...dto,
    };

    return await this.userRepo.update(updatedData, uuid);
  }
}