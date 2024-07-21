import {
  Body,
  Controller,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import AlarmService from './alarm.service';
import RequestCreateAlarmDto from './dto/request/create-alarm.dto';
import { Observable } from 'rxjs';

@Controller('alarms')
export default class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post()
  async createAlarm(@Body() body: RequestCreateAlarmDto) {
    await this.alarmService.createAlarm(body);
  }

  @Sse('sse')
  async getAlarms(@Param('userId') userId: string) {}
}
