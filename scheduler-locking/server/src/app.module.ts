import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import NotificationModule from './modules/notification/notification.module';
import LockModule from './modules/lock/lock.module';

@Module({
  imports: [NotificationModule, LockModule, ScheduleModule.forRoot()],
})
export class AppModule {}
