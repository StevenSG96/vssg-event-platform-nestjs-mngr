import { Module } from '@nestjs/common';
import { LoginService } from 'src/aplication/services/user/login.service';
import { AuthTokenProvider } from 'src/infrastructure/adapter/auth/authTokenProvider';
import { PrimsaLogin } from 'src/infrastructure/persistence/prisma/login/prisma.login';
import { LoginController } from 'src/infrastructure/web/user/login.controller';

@Module({
  controllers: [LoginController],
  providers: [
    {
      provide: 'ILoginHandler',
      useFactory: (repo: PrimsaLogin, auth: AuthTokenProvider) =>
        new LoginService(repo, auth),
      inject: [PrimsaLogin, AuthTokenProvider],
    },
    PrimsaLogin,
    AuthTokenProvider,
  ],
  imports: [LoginService],
})
export class LoginModule {}
