import { LoginEntity } from 'src/domain/entities/user/login.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';

export interface ILoginValidation {
  validate(user: LoginEntity): Promise<UserEntity>;
}
