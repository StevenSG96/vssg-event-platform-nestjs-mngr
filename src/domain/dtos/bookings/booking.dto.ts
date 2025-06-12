/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingDTO {
  @IsNotEmpty()
  @IsDateString()
    bookingDate: Date;

  @IsNotEmpty()
  @IsNumber()
    eventId: number;

  status?: 'confirmed' | 'cancelled';
}
