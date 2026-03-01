import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class DriverUserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const driver = req.user;

    if (!driver) throw new ForbiddenException('No autenticado');

    if (driver.type !== 'driver') {
      throw new ForbiddenException('Solo final-user puede acceder');
    }

    const routeUuid = req.params?.uuid;
    if (routeUuid && driver.uuid !== routeUuid) {
      throw new ForbiddenException('No podés acceder a datos de otro usuario');
    }

    return true;
  }
}
