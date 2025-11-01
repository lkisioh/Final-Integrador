export class ProductEntity {
  public readonly id: number;
  public readonly uuid: string;
  public readonly vendorUuid: string;
  public name: string;
  public description: string;
  public price: number;
  public photo: string;
  public available: boolean;
}
