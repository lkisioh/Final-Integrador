import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { IProductRepository } from 'src/modules/products/domain/repositories/product.repository.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class VendorOwnsProductGuard implements CanActivate {
  constructor(
    @Inject('IProductRepository')
    private readonly products: IProductRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new ForbiddenException('No autenticado');
    if (user.type !== 'vendor') throw new ForbiddenException('Solo vendor');

    const vendorUuid = req.params?.vendorUuid;
    if (vendorUuid && vendorUuid !== user.uuid) {
      throw new ForbiddenException('No podés operar sobre otro vendor');
    }

    const productUuid = req.params?.productUuid ?? req.params?.uuid;
    if (!productUuid) throw new ForbiddenException('Falta productUuid');

    const product = await this.products.findByUuid(productUuid);
    if (!product) throw new ForbiddenException('Producto no encontrado');

    if (product.vendorUuid !== user.uuid) {
      throw new ForbiddenException('No podés modificar productos de otro vendor');
    }

    return true;
  }
}
