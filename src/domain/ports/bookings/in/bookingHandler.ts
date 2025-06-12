import { BookEntity } from 'src/domain/entities/bookings/booking.entity';

export interface IBookingHandler {
  readAll(userId: number): Promise<BookEntity[]>;
  create(book: BookEntity): Promise<void>;
  cancel(bookId: number): Promise<void>;
}
