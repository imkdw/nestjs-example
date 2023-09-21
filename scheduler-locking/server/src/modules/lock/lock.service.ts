import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Redlock, { Lock } from 'redlock';

@Injectable()
export default class LockService {
  private readonly redisClient: Redis;
  private readonly redLock: Redlock;

  constructor() {
    this.redisClient = new Redis();
    this.redLock = new Redlock([this.redisClient], {
      driftFactor: 0.01, // 시간 흔들림 보정 계수
      retryCount: 0, // 재시도 횟수 (0으로 설정하여 락이 설정되어 있을 경우 무시)
      retryDelay: 0, // 재시도 간격 (1초)
    });
  }

  async setLock(type: string, ttl: number): Promise<Lock> {
    return await this.redLock.acquire([type], ttl);
  }

  async delLock(lock: Lock) {
    return await this.redLock.release(lock);
  }
}
