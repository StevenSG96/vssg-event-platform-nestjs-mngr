import { BookEntity } from 'src/domain/entities/bookings/booking.entity';
import { IBookingHandler } from 'src/domain/ports/bookings/in/bookingHandler';
import { IBookingFetcher } from 'src/domain/ports/bookings/out/bookingFetcher';

export class BookingService implements IBookingHandler {
  constructor(private readonly bookingFetcher: IBookingFetcher) {}

  async readAll(userId: number): Promise<BookEntity[] | null> {
    return await this.bookingFetcher.readerAll(userId);
  }

  async create(book: BookEntity): Promise<void> {
    await this.bookingFetcher.creater(book);
  }

  async cancel(book: BookEntity): Promise<void> {
    await this.bookingFetcher.canceller(book);
  }
}
