import { Injectable, Inject, ConflictException, InternalServerErrorException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';


import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
@Injectable()
export class CreateUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const exist = await this.userRepository.findByEmail(createUserDto.email);
    if (exist) {
      throw new ConflictException('El email ya esta registrado');
    }

    try {
      const newUser = await this.userRepository.create(createUserDto);
      const success = await this.userRepository.save(newUser);

      return success;

    } catch (error) {

      throw new InternalServerErrorException('Error al guardar usuario '+error);
    }
  }
  }
