import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTOR_TYPES_KEY } from '../types/actor-types.decorator';
import type { ActorType } from '../types/types';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class ActorTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<ActorType[]>(
      ACTOR_TYPES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!allowed || allowed.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    if (!req.user?.type) throw new ForbiddenException('No autenticado');
    if (!allowed.includes(req.user.type))
      throw new ForbiddenException('No autorizado');
    return true;
  }
}
