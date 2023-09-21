import { Module } from '@nestjs/common';
import NotificationScheduler from './notification.scheduler';
import LockModule from '../lock/lock.module';

@Module({
  imports: [LockModule],
  providers: [NotificationScheduler],
})
export default class NotificationModule {}
