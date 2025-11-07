import { DriverEntity } from "../entities/driver.entity";

export interface IDriverRepository {
  findById(id: number): Promise<DriverEntity | null>;
  save(product: DriverEntity): Promise<DriverEntity>;
}
