import { Module } from '@nestjs/common';
import { LoginService } from 'src/aplication/services/user/login.service';
import { AuthTokenProvider } from 'src/infrastructure/adapter/auth/authTokenProvider';
import { PrismaLogin } from 'src/infrastructure/persistence/prisma/user/prisma.login';
import { LoginController } from 'src/infrastructure/web/user/login.controller';

@Module({
  controllers: [LoginController],
  providers: [
    {
      provide: 'ILoginHandler',
      useFactory: (repo: PrismaLogin, auth: AuthTokenProvider) =>
        new LoginService(repo, auth),
      inject: [PrismaLogin, AuthTokenProvider],
    },
    PrismaLogin,
    AuthTokenProvider,
  ],
  imports: [LoginService],
})
export class LoginModule {}
