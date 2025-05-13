import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UserEntity } from 'src/domain/entities/user/user.entity';
import { IUserRegister } from 'src/domain/ports/user/out/register';

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

@Injectable()
export class PrismaSignUp implements IUserRegister {
  async uniqueEmailvalidation(user: UserEntity): Promise<void> {
    const data = await prisma.user.findUnique({ where: { email: user.email } });

    if (data) {
      throw new BadRequestException('Already registered user');
    }
  }
  async register(user: UserEntity): Promise<void> {
    await this.uniqueEmailvalidation(user);

    const passwordHashed = await bcrypt.hash(user.password, SALT_ROUNDS);
    const role = await prisma.role.findUnique({
      where: { name: user.role ?? 'user' },
    });

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: passwordHashed,
        roleId: role.id,
      },
    });
  }
}
