import { DriverEntity } from "../entities/driver.entity";

export interface IDriverRepository {
  findByEmail(email: string, password: string): Promise<{ uuid: string } | null>;
  findById(id: number): Promise<DriverEntity | null>;
  save(product: DriverEntity): Promise<DriverEntity>;
}
