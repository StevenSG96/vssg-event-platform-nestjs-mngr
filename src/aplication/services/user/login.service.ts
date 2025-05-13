import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

import { LoginEntity } from 'src/domain/entities/user/login.entity';
import { ILoginHandler } from 'src/domain/ports/user/in/loginHandler';
import { ILoginValidation } from 'src/domain/ports/user/out/loginValidation';
import { AuthTokenProvider } from 'src/infrastructure/adapter/auth/authTokenProvider';

export class LoginService implements ILoginHandler {
  constructor(
    private readonly loginAuth: ILoginValidation,
    private readonly authTokenProvider: AuthTokenProvider,
  ) {}

  async auth(loginUser: LoginEntity): Promise<string> {
    const user = await this.loginAuth.validate(loginUser);

    const validPassWord = await bcrypt.compare(
      loginUser.password,
      user.password,
    );

    if (!validPassWord) {
      throw new UnauthorizedException('Invalid Password');
    }

    return await this.authTokenProvider.generateToken({
      email: user.email,
      name: user.name,
      role: user.role.name,
    });
  }
}
