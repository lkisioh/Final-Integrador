import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findByUuid(uuid: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(data: CreateUserDto): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
}

