import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

export interface IUserRepository {
  findById(id: number): Promise<UserEntity | null>;

  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  save(user: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findByUuid(uuid: string): Promise<UserEntity | null>;
  update(user: UpdateUserDto, uuid: string): Promise<UserEntity>;
  delete(uuid: string): Promise<void>;
}
