import { AuthEntity } from 'src/domain/entities/user/auth.entity';

export interface IAuthHandler {
  login(user: AuthEntity): Promise<string>;
}
