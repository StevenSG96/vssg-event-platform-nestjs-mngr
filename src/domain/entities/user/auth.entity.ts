import { Injectable } from '@nestjs/common';

interface IAuthEntity {
  email: string;
  password: string;
}

@Injectable()
export class AuthEntity {
  public email;
  public password;

  constructor(user: IAuthEntity) {
    Object.assign(this, user);
  }
}
