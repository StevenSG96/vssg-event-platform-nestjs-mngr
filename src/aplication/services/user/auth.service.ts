import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

import { AuthEntity } from 'src/domain/entities/user/auth.entity';
import { IAuthHandler } from 'src/domain/ports/user/in/AuthHandler';
import { IAuthValidation } from 'src/domain/ports/user/out/authValidation';
import { AuthTokenProvider } from 'src/infrastructure/adapter/auth/authTokenProvider';

export class AuthService implements IAuthHandler {
  constructor(
    private readonly auth: IAuthValidation,
    private readonly authTokenProvider: AuthTokenProvider,
  ) {}

  async login(loginUser: AuthEntity): Promise<string> {
    const user = await this.auth.findUser(loginUser);

    const validPassWord = await bcrypt.compare(
      loginUser.password,
      user.password,
    );

    if (!validPassWord) {
      throw new UnauthorizedException('Invalid Password');
    }

    return await this.authTokenProvider.generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
    });
  }
}
