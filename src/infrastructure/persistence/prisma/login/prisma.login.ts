import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { LoginEntity } from 'src/domain/entities/user/login.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { ILoginValidation } from 'src/domain/ports/user/out/loginValidation';

const prisma = new PrismaClient();

@Injectable()
export class PrimsaLogin implements ILoginValidation {
  async validate(user: LoginEntity): Promise<UserEntity> {
    const data = await prisma.user.findUnique({
      where: { email: user.email },
      include: { role: true },
    });

    if (!data) {
      throw new NotFoundException('User Not Found');
    }

    if (data.password !== user.password) {
      throw new UnauthorizedException('Invalid Password');
    }

    return data;
  }
}
