import { Module } from '@nestjs/common';
import { SignUpService } from 'src/aplication/services/user/singup.service';
import { PrismaSignUp } from 'src/infrastructure/persistence/prisma/user/prisma.singUp';
import { SignUpController } from 'src/infrastructure/web/user/signUp.controller';

@Module({
  controllers: [SignUpController],
  providers: [
    {
      provide: 'ISignUp',
      useFactory: (repo: PrismaSignUp) => new SignUpService(repo),
      inject: [PrismaSignUp],
    },
    PrismaSignUp,
  ],
  imports: [SignUpService],
})
export class SignUpModule {}
