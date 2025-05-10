import { EventEntity } from 'src/domain/entities/event/event.entity';
import { IEventHandler } from 'src/domain/ports/events/in/eventHandler';
import { IEventRepository } from 'src/domain/ports/events/out/eventRepository';

export class EventService implements IEventHandler {
  constructor(private readonly eventRepository: IEventRepository) {}

  getAll(): Promise<EventEntity[]> {
    return this.eventRepository.readAll();
  }

  getById(id: number): Promise<EventEntity> {
    return this.eventRepository.readById(id);
  }

  create(event: EventEntity): Promise<void> {
    return this.eventRepository.create(event);
  }

  delete(id: number): Promise<void> {
    return this.eventRepository.remove(id);
  }

  update(id: number, event: EventEntity): Promise<void> {
    return this.eventRepository.modify(id, event);
  }
}
