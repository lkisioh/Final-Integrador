export class OrderEntity {
  public readonly id: number;
  public readonly uuid: string; 
  
  public userUuid: string;
  public userName: string;
  
  public storeId: string;
  public storeName: string;
  
  public items: any[]; 
  public total: number;
  
  public address: string; 
  
  public status: 'pendiente' | 'aceptado' | 'entregado' = 'pendiente';
  public driverUuid: string | null = null;
  
  public createdAt: Date = new Date();
}