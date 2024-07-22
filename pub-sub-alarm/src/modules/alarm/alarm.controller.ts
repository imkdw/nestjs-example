import { Body, Controller, Post, Query, Sse } from '@nestjs/common';
import AlarmService from './alarm.service';
import RequestCreateAlarmDto from './dto/request/create-alarm.dto';
import AlaramSSEService from './alarm-sse.service';

@Controller('alarms')
export default class AlarmController {
  constructor(
    private readonly alarmService: AlarmService,
    private readonly sseService: AlaramSSEService,
  ) {}

  @Post()
  async createAlarm(@Body() body: RequestCreateAlarmDto) {
    await this.alarmService.createAlarm(body);
  }

  @Sse('sse')
  async getAlarmStreams(@Query('userId') userId: string) {
    return this.sseService.getAlarmStreams(userId);
  }
}
