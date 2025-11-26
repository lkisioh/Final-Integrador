import { AddressEntity } from '../entities/address.entity';
import { AddressDto } from '../../application/dtos/address.dto';

export interface IAddressRepository {
  save(address: AddressEntity): Promise<AddressEntity>;
  findByUuid(uuid: string): Promise<AddressEntity | null>;
  findAllOfUser(uuid: string): Promise<AddressEntity[]>;
}
