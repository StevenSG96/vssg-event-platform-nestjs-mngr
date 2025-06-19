import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingDTO } from 'src/domain/dtos/bookings/booking.dto';
import { BookEntity } from 'src/domain/entities/bookings/booking.entity';
import { IBookingHandler } from 'src/domain/ports/bookings/in/bookingHandler';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt.guard';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(
    @Inject('IBookingHandler') private readonly bookingService: IBookingHandler,
  ) {}

  @Get()
  readAll(@Req() req): Promise<BookEntity[]> {
    return this.bookingService.readAll(req.user.userId);
  }

  @Post()
  create(@Req() req, @Body() booking: BookingDTO): Promise<void> {
    const bookingEntity = new BookEntity({
      ...booking,
      userId: req.user.userId,
      status: 'confirmed',
    });
    return this.bookingService.create(bookingEntity);
  }

  @Put('/cancel/:id')
  cancel(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookingService.cancel(id);
  }
}
