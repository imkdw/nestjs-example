import { Module } from '@nestjs/common';
import { REDIS_SERVICE } from './redis.interface';
import RedisService from './redis.service';

@Module({
  providers: [
    {
      provide: REDIS_SERVICE,
      useClass: RedisService,
    },
  ],
  exports: [REDIS_SERVICE],
})
export default class RedisModule {}
