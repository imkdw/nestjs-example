import { Module } from '@nestjs/common';
import NotificationScheduler from './notification.scheduler';
import LockModule from '../lock/lock.module';

@Module({
  providers: [NotificationScheduler, LockModule],
})
export default class NotificationModule {}
