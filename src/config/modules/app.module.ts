import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { AuthModule } from './user/auth.module';
import { SignUpModule } from './user/signUp.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [BookingModule, EventModule, AuthModule, SignUpModule],
})
export class AppModule {}
