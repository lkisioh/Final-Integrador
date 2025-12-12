import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserOrmEntity } from '../databases/user.orm-entity';

import { AddressOrmEntity } from '../databases/address.orm-entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { AddressEntity } from '../../domain/entities/address.entity';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { AddressDto } from '../../application/dtos/address.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string, password: string): Promise<{ uuid: string } | null> {
    const user = await this.userRepo.findOne({ where: { email, password } });
    if (!user) return null;
    return { uuid: user.uuid };
  }
  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepo.create({
      uuid: uuidv4(),
      name: dto.name,
      email: dto.email,
      password: dto.password,
      addresses: (dto.addresses ?? []).map((addr) => {
        const address = new AddressOrmEntity();
        address.uuid = uuidv4();
        address.street = addr.street;
        address.number = addr.number;
        address.apartment = addr.apartment;
        return address;
      }),
    });

    const saved = await this.userRepo.save(user);

    const domainUser = new UserEntity();
    Object.assign(domainUser, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      email: saved.email,
      role: saved.role,
      addresses:
        saved.addresses?.map((addr) => {
          const domainAddr = new AddressEntity();
          Object.assign(domainAddr, {
            id: addr.id,
            uuid: addr.uuid,
            street: addr.street,
            number: addr.number,
            apartment: addr.apartment,
            user_uuid: saved.uuid,
          });
          return domainAddr;
        }) ?? [],
    });

    return domainUser;
  }

  async findAll(): Promise<UserEntity[]> {
    const entities = await this.userRepo.find();
    return entities.map((entity) => {
      const user = new UserEntity();
      Object.assign(user, {
        uuid: entity.uuid,
        name: entity.name,
        email: entity.email,
        addresses:
          entity.addresses?.map((addr) => {
            const address = new AddressEntity();
            Object.assign(address, addr);
            return address;
          }) ?? [],
      });
      return user;
    });
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const entity = await this.userRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const userFind = new UserEntity();
    Object.assign(userFind, {
      uuid: entity.uuid,
      name: entity.name,
      email: entity.email,
      addresses:
        entity.addresses?.map((addr) => {
          const address = new AddressEntity();
          Object.assign(address, addr);
          return address;
        }) ?? [],
    });

    return userFind;
  }

  async update(user: UpdateUserDto, uuid: string): Promise<UserEntity> {
    const ormUser = await this.userRepo.findOne({ where: { uuid } });
    if (!ormUser) throw new Error('User not found');

    ormUser.name = user.name;
    ormUser.email = user.email;

    if (user.addresses) {
      ormUser.addresses = user.addresses.map((addr) => {
        const address = new AddressOrmEntity();
        address.street = addr.street;
        address.number = addr.number;
        address.apartment = addr.apartment;
        return address;
      });
    }

    const saved = await this.userRepo.save(ormUser);

    const domainUser = new UserEntity();
    Object.assign(domainUser, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      email: saved.email,
      password: saved.password,
      role: saved.role,
      addresses: saved.addresses.map(addr => ({
        street: addr.street,
        number: addr.number,
        apartment: addr.apartment,
      })),
    });

    return domainUser;
  }
  async delete(uuid: string): Promise<void> {
    await this.userRepo.delete({ uuid });
  }

  async postAddress(  addressDto: AddressDto, uuid: string ): Promise<UserEntity> {
    const ormUser = await this.userRepo.findOne({ where: { uuid } });
    if (!ormUser) throw new Error('User not found');
    const newAddress = new AddressOrmEntity();
    newAddress.uuid = uuidv4();
    newAddress.street = addressDto.street;
    newAddress.number = addressDto.number;
    newAddress.apartment = addressDto.apartment;
    ormUser.addresses.push(newAddress);
    const saved = await this.userRepo.save(ormUser);
    const domainUser = new UserEntity();
    Object.assign(domainUser, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      email: saved.email,
      password: saved.password,
      role: saved.role,
      addresses: saved.addresses.map(addr => ({
        street: addr.street,
        number: addr.number,
        apartment: addr.apartment,
      })),
    });
    return domainUser;
  }
}
