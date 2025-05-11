import { EventEntity } from 'src/domain/entities/event/event.entity';

export interface IEventHandler {
  getAll(): Promise<EventEntity[]>;
  create(event: EventEntity): Promise<void>;
  getById(id: number): Promise<EventEntity>;
  delete(id: number): Promise<void>;
  update(id: number, event: EventEntity): Promise<void>;
}
