import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BookEntity } from 'src/domain/entities/bookings/booking.entity';
import { IBookingFetcher } from 'src/domain/ports/bookings/out/bookingFetcher';

const prisma = new PrismaClient();

export class PrismaBooking implements IBookingFetcher {
  async creater(book: BookEntity): Promise<void> {
    const { id, bookingDate, eventId, userId, status } = book;

    await this.validateCapacity(eventId);

    await prisma.booking.create({
      data: { id, bookingDate, eventId, userId, status },
    });
  }
  async readerAll(userId: number): Promise<BookEntity[]> {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { event: true },
    });

    return bookings;
  }
  async canceller(book: BookEntity): Promise<void> {
    const bookData = await prisma.booking.findUnique({
      where: { id: book.id },
    });

    if (!bookData) {
      throw new NotFoundException('Book Not Found');
    }
  }

  async validateCapacity(eventId: number): Promise<void> {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException('Event Not Exists');
    }
    if (event.capacity <= 0) {
      throw new InternalServerErrorException('Event does not have capacity');
    }
  }
}
