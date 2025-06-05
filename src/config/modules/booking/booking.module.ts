import { Module } from '@nestjs/common';
import { BookingService } from 'src/aplication/services/booking/booking.service';
import { PrismaBooking } from 'src/infrastructure/persistence/prisma/booking/prisma.booking';
import { BookingController } from 'src/infrastructure/web/booking/booking.controller';
import { AuthModule } from '../user/auth.module';

@Module({
  controllers: [BookingController],
  providers: [
    {
      provide: 'IBookingHandler',
      useFactory: (repo: PrismaBooking) => new BookingService(repo),
      inject: [PrismaBooking],
    },
    PrismaBooking,
  ],
  imports: [BookingService, AuthModule],
})
export class BookingModule {}
