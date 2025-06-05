import {
  Body,
  Controller,
  Get,
  Inject,
  // Param,
  // ParseIntPipe,
  Post,
  //Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingDTO } from 'src/domain/dtos/bookings/booking.dto';
import { BookEntity } from 'src/domain/entities/bookings/booking.entity';
import { IBookingHandler } from 'src/domain/ports/bookings/in/bookingHandler';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt.guard';

@Controller('booking')
export class BookingController {
  constructor(
    @Inject('IBookingHandler') private readonly bookingService: IBookingHandler,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  readAll(@Req() req): Promise<BookEntity[]> {
    return this.bookingService.readAll(req.user.userId);
  }

  @Post()
  create(@Body() booking: BookingDTO): Promise<void> {
    const bookingEntity = new BookEntity(booking);
    return this.bookingService.create(bookingEntity);
  }

  // @Put(':id')
  // modify(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() event: EventDTO,
  // ): Promise<void> {
  //   const bookingEntity = new EventEntity(event);
  //   return this.bookingService.cancel(id);
  // }
}
