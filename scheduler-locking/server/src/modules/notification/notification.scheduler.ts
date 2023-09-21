import { Injectable } from '@nestjs/common';
import LockService from '../lock/lock.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationType } from './types/notification.enum';
import { Lock } from 'redlock';

@Injectable()
export default class NotificationScheduler {
  private readonly lockKey: string;
  private readonly ttl: number;

  constructor(private readonly lockService: LockService) {
    this.lockKey = 'notification-scheduler-lock';
    this.ttl = 12000;
  }

  @Cron('*/1 * * * * *')
  async noti() {
    try {
      const lock = await this.lockService.setLock(this.lockKey, this.ttl);
      console.log(new Date().getSeconds());
      await this.lockService.delLock(lock);
    } catch (err) {}
  }
}
