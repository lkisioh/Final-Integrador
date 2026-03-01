import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ACTOR_OWNERSHIP_KEY,
  ActorOwnershipMeta,
} from '../decorators/actor-ownership.decorator';

@Injectable()
export class ActorOwnershipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const meta = this.reflector.getAllAndOverride<ActorOwnershipMeta>(
      ACTOR_OWNERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );

    // si no hay metadata, no aplicamos restricción
    if (!meta) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('No autenticado');
    }

    // 1) Tipo permitido
    if (!meta.types.includes(user.type)) {
      throw new ForbiddenException('No autorizado para este recurso');
    }

    // 2) Ownership por param
    const paramValue = req.params?.[meta.param];
    if (!paramValue) {
      throw new ForbiddenException(`Falta parámetro ${meta.param} en la ruta`);
    }

    if (user.uuid !== paramValue) {
      throw new ForbiddenException('No podés operar sobre recursos de otro usuario');
    }

    return true;
  }
}