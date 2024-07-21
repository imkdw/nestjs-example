import { IsString } from 'class-validator';

export default class RequestCreateAlarmDto {
  @IsString()
  toUserId: string;

  @IsString()
  message: string;
}
