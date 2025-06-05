import { AuthEntity } from 'src/domain/entities/user/auth.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';

export interface IAuthValidation {
  findUser(user: AuthEntity): Promise<UserEntity>;
}
