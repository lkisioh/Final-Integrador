
//Entidad de negocio
export class UserEntity {
  
    public readonly id: number;
    public readonly uuid: string;
    public name: string;
    public email: string;
    public password: string;
    public role: string = 'user';
    public readonly createdAt: Date = new Date();
    public addresses: AddressEntity[] = [];
   
}

export class AddressEntity {
  
    public readonly id: number;
    public street: string;
    public number: number;
    public apartment: string;
  
}