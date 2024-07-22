import { Module } from '@nestjs/common';
import AlarmController from './alarm.controller';
import AlarmService from './alarm.service';
import RedisModule from '../../infra/redis/redis.module';
import AlaramSSEService from './alarm-sse.service';

@Module({
  imports: [RedisModule],
  controllers: [AlarmController],
  providers: [AlarmService, AlaramSSEService],
})
export default class AlarmModule {}
