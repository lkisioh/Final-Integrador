import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  create(register: RegisterAuthDto) {
    return 'This action adds a new auth'+register;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} auth`;
  }

  update(id: number, loginAuthDto: LoginAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
