import { LoginEntity } from 'src/domain/entities/user/login.entity';

export interface ILoginHandler {
  auth(user: LoginEntity): Promise<string>;
}
