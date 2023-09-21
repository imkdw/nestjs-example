import { Injectable } from '@nestjs/common';
import LockService from '../lock/lock.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationType } from './types/notification.enum';
import { Lock } from 'redlock';

@Injectable()
export default class NotificationScheduler {
  private readonly lockKey: string;

  constructor(private readonly lockService: LockService) {
    this.lockKey = 'notification-scheduler-lock';
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async noti() {
    const lockAcquired = await this.lockService.setLock(this.lockKey, 10000);

    if (lockAcquired) {
      console.log('lockAcquired');
      try {
        console.log('send notification', new Date().getSeconds());
        await this.lockService.delLock(this.lockKey);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('lock not Acquired');
    }
  }
}
