import { Injectable, OnModuleInit } from '@nestjs/common';
import IRedisService from './redis.interface';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import {
  ALARM_CHANNEL,
  NEW_ALARM_EVENT,
} from '../../modules/alarm/constants/alarm.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import NewAlarmEvent from '../../modules/alarm/events/new-alarm.event';

@Injectable()
export default class RedisService implements IRedisService, OnModuleInit {
  private redisClient: Redis;
  private subscriber: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly emitter: EventEmitter2,
  ) {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
    this.subscriber = this.redisClient.duplicate();
  }

  async onModuleInit() {
    await this.subscriber.subscribe(ALARM_CHANNEL);

    this.subscriber.on('message', (channel, message) => {
      this.emitter.emit(NEW_ALARM_EVENT, new NewAlarmEvent(message));
    });
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.redisClient.publish(channel, message);
  }
}
