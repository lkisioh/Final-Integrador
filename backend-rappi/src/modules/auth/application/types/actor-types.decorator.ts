import { SetMetadata } from '@nestjs/common';
import type { ActorType } from './types';

export const ACTOR_TYPES_KEY = 'actor_types';
export const ActorTypes = (...types: ActorType[]) => SetMetadata(ACTOR_TYPES_KEY, types);