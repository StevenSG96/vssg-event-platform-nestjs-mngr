import { Injectable } from '@nestjs/common';
import { EventDTO } from 'src/domain/dtos/events/event.dto';
import { UserDTO } from 'src/domain/dtos/user/user.dto';

interface IBookingEntity {
  id?: number;
  bookingDate: Date;
  eventId: number;
  event: EventDTO;
  userId: number;
  user: UserDTO;
  status: 'confirmed' | 'cancelled';
}

@Injectable()
export class BookEntity {
  public id;
  public bookingDate;
  public eventId;
  public event;
  public userId;
  public status;

  constructor(book: IBookingEntity) {
    Object.assign(this, book);
  }
}
