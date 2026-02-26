export type ActorType = 'vendor' | 'final-user' | 'driver';

export type JwtPayload = {
  sub: string; //uuid
  type: ActorType;
  email: string;
  name: string;
};
