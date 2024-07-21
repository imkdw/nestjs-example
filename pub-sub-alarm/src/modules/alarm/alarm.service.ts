import { Inject, Injectable } from '@nestjs/common';
import CreateAlarmDto from './dto/internal/create-alarm.dto';
import { PrismaService } from '../../infra/redis/database/prisma.service';
import IRedisService, {
  REDIS_SERVICE,
} from '../../infra/redis/redis.interface';
import { ALARM_CHANNEL } from './constants/alarm.constant';

@Injectable()
export default class AlarmService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_SERVICE) private readonly redisService: IRedisService,
  ) {}

  async createAlarm(dto: CreateAlarmDto) {
    // 1. 레디스 메세지 발행
    await this.redisService.publish(
      ALARM_CHANNEL,
      JSON.stringify({
        toUserId: dto.toUserId,
        message: dto.message,
        createdAt: new Date(),
      }),
    );

    // 2. alarm create
    await this.prisma.alarms.create({
      data: {
        toUserId: dto.toUserId,
        message: dto.message,
      },
    });
  }

  async getAlarms(userId: string) {
    const alarms = await this.prisma.alarms.findMany({
      where: {
        toUserId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alarms.map((alarm) => ({
      data: JSON.parse(alarm.message),
    }));
  }
}
