export class OrderEntity {
  id: number;
  uuid: string;
  userUuid: string;
  userName: string;
  storeId: string;
  storeName: string;
  items: any[];
  total: number;
  address: string;
  status: string = 'pendiente';
  driverUuid: string | null = null;
  driverNombre: string | null = null;
  createdAt: Date = new Date();
}