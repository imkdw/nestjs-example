import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification')
export default class NotificationConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(job.data);
  }
}
