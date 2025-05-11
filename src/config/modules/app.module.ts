import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [EventModule, LoginModule],
})
export class AppModule {}
