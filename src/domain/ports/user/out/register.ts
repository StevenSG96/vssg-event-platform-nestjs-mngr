import { UserEntity } from 'src/domain/entities/user/user.entity';

export interface IUserRegister {
  register(user: UserEntity): Promise<void>;
}
