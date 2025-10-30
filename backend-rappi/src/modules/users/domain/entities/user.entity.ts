//Entidad de negocio

import { AddressEntity } from './address.entity';

export class UserEntity {
  public readonly id: number;
  public readonly uuid: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string = 'user';
  public readonly createdAt: Date = new Date();
  public addresses: AddressEntity[] = [];
}
