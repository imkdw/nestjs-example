import { Inject, Injectable } from '@nestjs/common';
import IRedisService, {
  REDIS_SERVICE,
} from '../../infra/redis/redis.interface';
import { Subject } from 'rxjs';

@Injectable()
export default class AlaramSSEService {
  private readonly alarmSubject = new Subject<any>();

  constructor(
    @Inject(REDIS_SERVICE) private readonly redisService: IRedisService,
  ) {}
}
