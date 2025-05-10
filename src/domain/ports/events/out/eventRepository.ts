import { EventEntity } from 'src/domain/entities/event/event.entity';

export interface IEventRepository {
  readAll(): Promise<EventEntity[]>;
  create(event: EventEntity): Promise<void>;
  readById(id: number): Promise<EventEntity>;
  remove(id: number): Promise<void>;
  modify(id: number, event: EventEntity): Promise<void>;
}
