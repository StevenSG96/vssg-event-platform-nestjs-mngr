import { Injectable, InternalServerErrorException } from "@nestjs/common";

interface IEventEntity {
  id?: number;
  name: string;
  description: string;
  eventDate: Date;
  location: string;
  organizer: string;
  capacity: number;
  availableSeats: number;
}

@Injectable()
export class EventEntity {
  public id;
  public name;
  public description;
  public eventDate;
  public location;
  public organizer;
  public capacity;
  public availableSeats;

  constructor(event: IEventEntity) {
    this.validateAvailableSeats(event.capacity, event.availableSeats);
    Object.assign(this, event);
  }

  public validateAvailableSeats(capacity: number, availableSeats: number) {
    if (capacity < availableSeats) {
      throw new InternalServerErrorException('Capacity cannot be less than available seats');
    }
  }
}
