import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEntity } from 'src/domain/entities/event/event.entity';
import { IEventRepository } from 'src/domain/ports/events/out/eventRepository';

const prisma = new PrismaClient();

@Injectable()
export class PrismaEvent implements IEventRepository {
  async validateEventId(id: number): Promise<void> {
    const data = await prisma.event.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Event Not Found');
    }
  }

  async readAll(): Promise<EventEntity[]> {
    const data = await prisma.event.findMany({});
    if (!data || data.length === 0) {
      throw new NotFoundException('There Are Not Events');
    }
    return data.map((event) => new EventEntity(event));
  }

  async readById(id: number): Promise<EventEntity> {
    const data = await prisma.event.findUnique({ where: { id } });

    if (!data) {
      throw new NotFoundException('Event Not Found');
    }
    return new EventEntity(data);
  }

  async create(event: EventEntity): Promise<void> {
    await prisma.event.create({ data: event });
  }

  async remove(id: number): Promise<void> {
    await this.validateEventId(id);
    await prisma.event.delete({ where: { id } });
  }

  async modify(id: number, event: EventEntity): Promise<void> {
    await this.validateEventId(id);
    await prisma.event.update({ where: { id }, data: event });
  }
}
