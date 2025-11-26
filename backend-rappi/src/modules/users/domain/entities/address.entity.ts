import { UserEntity } from './user.entity';

export class AddressEntity {
  public readonly id: number;
  public readonly uuid: string;
  public street: string;
  public number: number;
  public apartment: string;
  public user: UserEntity;
  public user_uuid: string;
}
