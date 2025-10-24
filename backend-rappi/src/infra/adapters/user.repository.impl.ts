import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../../infra/typeorm/entities/user.orm-entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(

    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.ormRepo.find();
    return users;
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const u = await this.ormRepo.findOneBy({ uuid });
    return u ? u : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const u = await this.ormRepo.findOneBy({ email });
    return u ? u : null;
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const userEntity = this.ormRepo.create({
  ...data,
  addresses: data.addresses?.map((addr) => ({
    street: addr.street,
    number: addr.number,
    apartment: addr.apartment,
  })),
});

const saved = await this.ormRepo.save(userEntity);

// 🔄 Mapeo de ORM -> Dominio
return new UserEntity({
  id: saved.id,
  uuid: saved.uuid,
  name: saved.name,
  email: saved.email,
  password: saved.password,
  addresses: saved.addresses?.map((a) => ({
    street: a.street,
    number: a.number), 
    apartment: a.apartment,
  })),
});
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const saved = await this.ormRepo.save(user);
    return saved;
  }
}