import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserOrmEntity } from '../../infra/databases/user.orm-entity';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
export const USER_REPO = Symbol('USER_REPO');
export interface IUserRepository {
  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  createUser(user: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findByUuid(uuid: string): Promise<UserOrmEntity | null>;
  update(user: UpdateUserDto, uuid: string): Promise<UserEntity>;
  delete(uuid: string): Promise<void>;
}
