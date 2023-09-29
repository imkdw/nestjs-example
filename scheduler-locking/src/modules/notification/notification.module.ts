import { Module } from '@nestjs/common';
import NotificationScheduler from './notification.scheduler';
import LockModule from '../lock/lock.module';
import { BullModule } from '@nestjs/bull';
import NotificationConsumer from './notification.consumer';

@Module({
  imports: [
    LockModule,
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  providers: [NotificationScheduler, NotificationConsumer],
})
export default class NotificationModule {}
