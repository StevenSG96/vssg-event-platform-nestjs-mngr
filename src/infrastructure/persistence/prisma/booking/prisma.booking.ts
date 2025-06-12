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
    await this.existingBooking(eventId, userId);

    await prisma.$transaction(async (tx) => {
      await tx.booking.create({
        data: { id, bookingDate, eventId, userId, status },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { availableSeats: { decrement: 1 } },
      });
    });
  }
  async readerAll(userId: number): Promise<BookEntity[]> {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { event: true },
    });

    return bookings;
  }
  async canceller(bookId: number): Promise<void> {
    await this.validateBook(bookId);

    await prisma.booking.update({
      where: { id: bookId },
      data: { status: 'cancelled' },
    });
  }

  async validateBook(bookId: number) {
    const bookData = await prisma.booking.findUnique({
      where: { id: bookId },
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

  async existingBooking(eventId: number, userId: number): Promise<void> {
    const bookExists = await prisma.booking.findFirst({
      where: { AND: [{ userId: userId }, { eventId: eventId }] },
    });
    if (bookExists) {
      throw new InternalServerErrorException(
        'This user already has a reservation for this event',
      );
    }
  }
}
