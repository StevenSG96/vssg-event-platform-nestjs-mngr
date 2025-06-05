import { BookEntity } from 'src/domain/entities/bookings/booking.entity';

export interface IBookingFetcher {
  readerAll(userId: number): Promise<BookEntity[]>;
  creater(book: BookEntity): Promise<void>;
  canceller(book: BookEntity): Promise<void>;
}
