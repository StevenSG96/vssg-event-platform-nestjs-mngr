import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { LoginModule } from './user/login.module';
import { SignUpModule } from './user/signUp.module';

@Module({
  imports: [EventModule, LoginModule, SignUpModule],
})
export class AppModule {}
