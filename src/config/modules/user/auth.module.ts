import { Module } from '@nestjs/common';
import { AuthService } from 'src/aplication/services/user/auth.service';
import { AuthTokenProvider } from 'src/infrastructure/adapter/auth/authTokenProvider';
import { PrismaAuth } from 'src/infrastructure/persistence/prisma/user/prisma.auth';
import { AuthController } from 'src/infrastructure/web/user/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthHandler',
      useFactory: (repo: PrismaAuth, auth: AuthTokenProvider) =>
        new AuthService(repo, auth),
      inject: [PrismaAuth, AuthTokenProvider],
    },
    PrismaAuth,
    AuthTokenProvider,
  ],
  imports: [AuthService],
  exports: [AuthTokenProvider],
})
export class AuthModule {}
