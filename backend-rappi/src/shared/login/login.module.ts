import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

import { UsersModule } from 'src/modules/users/user.module';
import { VendorsModule } from 'src/modules/vendors/vendor.module';
import { DriversModule } from 'src/modules/drivers/driver.module';

@Module({
  imports: [UsersModule, VendorsModule, DriversModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
