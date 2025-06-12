import { Injectable } from '@nestjs/common';

interface IBookingEntity {
  id?: number;
  bookingDate: Date;
  eventId: number;
  userId: number;
  status: 'confirmed' | 'cancelled';
}

@Injectable()
export class BookEntity {
  public id;
  public bookingDate;
  public eventId;
  public userId;
  public status;

  constructor(book: IBookingEntity) {
    Object.assign(this, book);
  }
}
