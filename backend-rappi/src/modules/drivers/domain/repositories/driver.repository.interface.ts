import { DriverEntity } from "../entities/driver.entity";
export const DRIVER_REPO = Symbol('DRIVER_REPO');
export interface IDriverRepository {
  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  findById(id: number): Promise<DriverEntity | null>;
  save(product: DriverEntity): Promise<DriverEntity>;
  delete (uuid: string): Promise<void>;
}
