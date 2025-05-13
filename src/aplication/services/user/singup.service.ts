import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/domain/entities/user/user.entity';
import { ISignUp } from 'src/domain/ports/user/in/signUp';
import { IUserRegister } from 'src/domain/ports/user/out/register';

const SALT_ROUNDS = 10;
export class SignUpService implements ISignUp {
  constructor(private readonly userRegister: IUserRegister) {}

  async signUpUser(user: UserEntity): Promise<void> {
    const passwordHashed = await bcrypt.hash(user.password, SALT_ROUNDS);
    await this.userRegister.register({ ...user, password: passwordHashed });
  }
}
