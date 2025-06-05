import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AuthEntity } from 'src/domain/entities/user/auth.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { IAuthValidation } from 'src/domain/ports/user/out/authValidation';

const prisma = new PrismaClient();

@Injectable()
export class PrismaAuth implements IAuthValidation {
  async findUser(user: AuthEntity): Promise<UserEntity> {
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
