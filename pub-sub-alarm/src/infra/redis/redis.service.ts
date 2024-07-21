import { Injectable, OnModuleInit } from '@nestjs/common';
import IRedisService from './redis.interface';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { ALARM_CHANNEL } from '../../modules/alarm/constants/alarm.constant';

@Injectable()
export default class RedisService implements IRedisService, OnModuleInit {
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
  }

  async onModuleInit() {
    await this.redisClient.subscribe(
      ALARM_CHANNEL,
      async (channel, message) => {
        console.log('Received channel', channel);
        console.log('Received message', message);
      },
    );
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.redisClient.publish(channel, message);
  }

  async subscribe(channel: string): Promise<void> {
    await this.redisClient.subscribe(channel);
  }
}
