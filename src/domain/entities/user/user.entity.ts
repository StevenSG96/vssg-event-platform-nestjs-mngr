import { Injectable } from '@nestjs/common';

interface IUserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  role?: string;
}

@Injectable()
export class UserEntity {
  public id;
  public email;
  public password;
  public name;
  public role;

  constructor(user: IUserEntity) {
    Object.assign(this, user);
  }
}
