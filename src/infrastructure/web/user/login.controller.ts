import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDTO } from 'src/domain/dtos/user/login.dto';
import { LoginEntity } from 'src/domain/entities/user/login.entity';
import { ILoginHandler } from 'src/domain/ports/user/in/loginHandler';

@Controller('login')
export class LoginController {
  constructor(
    @Inject('ILoginHandler') private readonly loginService: ILoginHandler,
  ) {}

  @Post()
  auth(@Body() loginUser: LoginDTO): Promise<string> {
    const loginEntity = new LoginEntity(loginUser);
    return this.loginService.auth(loginEntity);
  }
}
