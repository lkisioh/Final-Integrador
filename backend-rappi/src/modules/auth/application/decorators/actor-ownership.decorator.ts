import { SetMetadata } from '@nestjs/common';

export const ACTOR_OWNERSHIP_KEY = 'actor_ownership';

export type ActorOwnershipMeta = {
  types: Array<'vendor' | 'final-user' | 'driver'>;
  param: string; // nombre del param en la ruta, ej: 'vendorUuid'
};

export const ActorOwnership = (
  types: ActorOwnershipMeta['types'],
  param: ActorOwnershipMeta['param'],
) =>
  SetMetadata(ACTOR_OWNERSHIP_KEY, {
    types,
    param,
  } satisfies ActorOwnershipMeta);
