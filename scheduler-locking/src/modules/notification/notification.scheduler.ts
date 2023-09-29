import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import LockService from '../lock/lock.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export default class NotificationScheduler {
  private readonly lockKey = 'notification-scheduler-lock';
  constructor(
    private readonly lockService: LockService,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) {}

  @Cron('*/2 * * * * *')
  async addJobs() {
    const jobIds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 999) + 1);

    const now = new Date();
    const [year, month, seconds] = [now.getFullYear(), now.getMonth(), now.getSeconds()];
    const lockKeyWithDate = this.lockKey + `:${year}-${month}-${seconds}`;
    const isLocked = await this.lockService.setLock(lockKeyWithDate, 1000);

    if (isLocked) {
      await this.notificationQueue.add({
        id: lockKeyWithDate,
        jobIds,
      });
      await this.lockService.delLock(lockKeyWithDate);
    }
  }
}
