import { Module } from '@nestjs/common';
import AlarmController from './alarm.controller';
import AlarmService from './alarm.service';
import RedisModule from '../../infra/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [AlarmController],
  providers: [AlarmService],
})
export default class AlarmModule {}
