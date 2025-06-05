import { EventDTO } from '../events/event.dto';
import { UserDTO } from '../user/user.dto';

export class BookingDTO {
  bookingDate: Date;
  eventId: number;
  event: EventDTO;
  userId: number;
  user: UserDTO;
  status: 'confirmed' | 'cancelled';
}
