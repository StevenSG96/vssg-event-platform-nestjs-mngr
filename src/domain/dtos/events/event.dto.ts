import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class EventDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  eventDate: Date;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  organizer: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  availableSeats: number;
}
