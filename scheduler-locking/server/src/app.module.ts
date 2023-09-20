import { Module } from '@nestjs/common';
import NotificationModule from './modules/notification/notification.module';
import LockModule from './modules/lock/lock.module';

@Module({
  imports: [NotificationModule, LockModule],
})
export class AppModule {}
