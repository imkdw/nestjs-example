import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AlarmModule from './modules/alarm/alarm.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './infra/redis/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DatabaseModule,
    AlarmModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
