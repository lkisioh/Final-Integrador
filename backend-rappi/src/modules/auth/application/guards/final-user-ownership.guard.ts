import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class FinalUserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new ForbiddenException('No autenticado');

    // ✅ solo final-user
    if (user.type !== 'final-user') {
      throw new ForbiddenException('Solo final-user puede acceder');
    }

    // ✅ ownership sobre :uuid
    const routeUuid = req.params?.uuid;
    if (routeUuid && user.uuid !== routeUuid) {
      throw new ForbiddenException('No podés acceder a datos de otro usuario');
    }

    return true;
  }
}