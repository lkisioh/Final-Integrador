export class DriverEntity {
  public readonly id: number;
  public readonly uuid: string;
  public name: string;
  public location: string;
  public phone: number;
  public vehicle: string;
  public email: string;
  public password: string;
  public role: string = 'driver';
  public available: boolean = true;
}
