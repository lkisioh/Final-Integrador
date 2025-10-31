import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserOrmEntity } from '../databases/user.orm-entity';
import { AddressOrmEntity } from '../databases/address.orm-entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { AddressEntity } from '../../domain/entities/address.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const addressEntities = (user.addresses ?? []).map(a => {
      const addr = new AddressOrmEntity();
      addr.street = a.street;
      addr.number = a.number;
      addr.apartment = a.apartment;
      return addr;
    });

    const ormUser = this.userRepo.create({
      uuid: user.uuid ?? uuidv4(),
      name: user.name,
      email: user.email,
      password: user.password,
      addresses: addressEntities,
    });

    const saved = await this.userRepo.save(ormUser);

    // Devolvemos al dominio
    const domainUser = new UserEntity();
    Object.assign(domainUser, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      email: saved.email,
      password: saved.password,
      addresses: saved.addresses.map(addr => ({
        street: addr.street,
        number: addr.number,
        apartment: addr.apartment,
      })),
    });

    return domainUser;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const entity = await this.userRepo.findOne({ where: { id } });
    if (!entity) return null;

    const userFind = new UserEntity();
    Object.assign(userFind, {
      id: entity.id,
      uuid: entity.uuid,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      addresses: entity.addresses.map(addr => {
        const address = new AddressEntity();
        Object.assign(address, addr);
        return address;
      }),
    });

    return userFind;
  }
}