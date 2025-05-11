import { Injectable } from '@nestjs/common';

interface ILoginEntity {
  email: string;
  password: string;
}

@Injectable()
export class LoginEntity {
  public email;
  public password;

  constructor(user: ILoginEntity) {
    Object.assign(this, user);
  }
}
