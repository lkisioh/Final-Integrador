import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserOrmEntity } from '../../infra/databases/user.orm-entity';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { AddressDto } from '../../application/dtos/address.dto';
export const USER_REPO = Symbol('USER_REPO');
export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findByUuid(uuid: string): Promise<UserEntity | null>;
  update(user: UpdateUserDto, uuid: string): Promise<UserEntity>;
  delete(uuid: string): Promise<void>;
  postAddress(addressDto: AddressDto, uuid: string): Promise<UserEntity>;
  updateAddress(userUuid: string, addressUuid: string, dto: AddressDto): Promise<UserEntity>;
  deleteAddress(userUuid: string, addressUuid: string): Promise<UserEntity>;
}
