export class OrderEntity {
  id: number;
  uuid: string;
  userUuid: string;
  userName: string;
  userOrderAddress: string;

  createdAt: Date = new Date();

  vendorUuid: string;
  vendorName: string;
  products: any[];
  status: string = 'pendiente';
  driverUuid: string | null = null;
  driverName: string | null = null;

  total: number;
}
