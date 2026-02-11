export class OrderEntity {
  id: number;
  uuid: string;
  userUuid: string;
  userName: string;
  address: string;

    createdAt: Date = new Date();

  vendorUuid: string;
  vendorName: string;
  items: any[];
  status: string = 'pendiente';
  driverUuid: string | null = null;
  driverName: string | null = null;

  total: number;

}