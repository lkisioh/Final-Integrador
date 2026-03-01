import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';


@Injectable()
export class VendorUserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const vendor = req.user;

    if (!vendor) throw new ForbiddenException('No autenticado');
    if (vendor.type !== 'vendor')
      throw new ForbiddenException('Solo vendor puede acceder');

    const vendorUuid = req.params?.vendorUuid; 
    if (vendorUuid && vendor.uuid !== vendorUuid) {
      throw new ForbiddenException('No podés operar sobre otro vendor');
    }

    return true;
  }
}