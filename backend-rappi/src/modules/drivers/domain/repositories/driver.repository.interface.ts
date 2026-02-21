import { DriverEntity } from "../entities/driver.entity";
import { UpdateDriverDto } from "../../application/dtos/update-driver.dto";
export const DRIVER_REPO = Symbol('DRIVER_REPO');
export interface IDriverRepository {
  findByEmail(email: string): Promise<DriverEntity | null>;
  findById(id: number): Promise<DriverEntity | null>;
  findByUuid(uuid: string): Promise<DriverEntity | null>;
  save(product: DriverEntity): Promise<DriverEntity>;
  findAll(): Promise<DriverEntity[]>;
  delete(uuid: string): Promise<void>;
  update(uuid: string, dto: UpdateDriverDto): Promise<DriverEntity | string>;
}
