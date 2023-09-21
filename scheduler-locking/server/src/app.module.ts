import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import NotificationModule from './modules/notification/notification.module';
import LockModule from './modules/lock/lock.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    NotificationModule,
    LockModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
