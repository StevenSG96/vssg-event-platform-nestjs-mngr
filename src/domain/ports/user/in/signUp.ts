import { UserEntity } from 'src/domain/entities/user/user.entity';

export interface ISignUp {
  signUpUser(user: UserEntity): Promise<void>;
}
