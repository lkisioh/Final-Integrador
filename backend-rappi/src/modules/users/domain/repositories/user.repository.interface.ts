import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
}
