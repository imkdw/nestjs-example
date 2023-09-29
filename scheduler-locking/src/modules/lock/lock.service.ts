import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { NotificationType } from '../notification/types/notification.enum';

@Injectable()
export default class LockService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  async setLock(type: string, ttl: number) {
    return await this.redisClient.set(type, 'locked', 'EX', ttl, 'NX');
  }

  async delLock(type: string) {
    return await this.redisClient.del(type);
  }
}
