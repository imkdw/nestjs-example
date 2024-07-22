import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NEW_ALARM_EVENT } from './constants/alarm.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import NewAlarmEvent from './events/new-alarm.event';

@Injectable()
export default class AlaramSSEService {
  constructor(private readonly emitter: EventEmitter2) {}

  async getAlarmStreams(userId: string) {
    return new Observable((observer) => {
      const listener = (data: NewAlarmEvent) => {
        if (data.userId === userId) {
          observer.next(data.message);
        }
      };

      this.emitter.on(NEW_ALARM_EVENT, listener);

      return () => {
        this.emitter.off(NEW_ALARM_EVENT, listener);
      };
    });
  }
}
