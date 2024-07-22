export default class NewAlarmEvent {
  constructor(private _message: string) {}

  get userId() {
    return JSON.parse(this.message).toUserId;
  }

  get message() {
    return this._message;
  }
}
