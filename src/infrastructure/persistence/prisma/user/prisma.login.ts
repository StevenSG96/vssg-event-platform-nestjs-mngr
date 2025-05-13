import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { LoginEntity } from 'src/domain/entities/user/login.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { ILoginValidation } from 'src/domain/ports/user/out/loginValidation';

const prisma = new PrismaClient();

@Injectable()
export class PrismaLogin implements ILoginValidation {
  async validate(user: LoginEntity): Promise<UserEntity> {
    const data = await prisma.user.findUnique({
      where: { email: user.email },
      include: { role: true },
    });

    if (!data) {
      throw new NotFoundException('User Not Found');
    }

    return data;
  }
}
