import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EventDTO } from 'src/domain/dtos/events/event.dto';
import { EventEntity } from 'src/domain/entities/event/event.entity';
import { IEventHandler } from 'src/domain/ports/events/in/eventHandler';

@Controller('event')
export class EventController {
  constructor(
    @Inject('IEventHandler') private readonly eventService: IEventHandler,
  ) {}

  @Get()
  findAll(): Promise<EventDTO[]> {
    return this.eventService.getAll();
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<EventDTO> {
    return this.eventService.getById(id);
  }
  @Post()
  create(@Body() event: EventDTO): Promise<void> {
    const eventEntity = new EventEntity(event);
    return this.eventService.create(eventEntity);
  }

  @Put(':id')
  modify(
    @Param('id', ParseIntPipe) id: number,
    @Body() event: EventDTO,
  ): Promise<void> {
    const eventEntity = new EventEntity(event);
    return this.eventService.update(id, eventEntity);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventService.delete(id);
  }
}
