import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDTO } from 'src/domain/dtos/user/login.dto';
import { IAuthHandler } from 'src/domain/ports/user/in/AuthHandler';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthHandler') private readonly authService: IAuthHandler,
  ) {}

  @Post('login')
  auth(@Body() loginUser: LoginDTO): Promise<string> {
    return this.authService.login(loginUser);
  }
}
