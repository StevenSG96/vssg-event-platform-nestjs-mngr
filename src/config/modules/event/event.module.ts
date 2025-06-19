import { Module } from '@nestjs/common';
import { EventService } from 'src/aplication/services/event/event.service';
import { PrismaEvent } from 'src/infrastructure/persistence/prisma/event/prisma.event';
import { EventController } from 'src/infrastructure/web/event/event.controller';
import { AuthModule } from '../user/auth.module';

@Module({
  controllers: [EventController],
  providers: [
    {
      provide: 'IEventHandler',
      useFactory: (repo: PrismaEvent) => new EventService(repo),
      inject: [PrismaEvent],
    },
    PrismaEvent,
  ],
  imports: [EventService, AuthModule],
})
export class EventModule {}
