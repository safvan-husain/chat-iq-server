export class WSEvent {
  eventName: string;
  recieverUsername: string;
  senderUsername: string;
  data: string | undefined;
  time: Number;

  constructor(
    eventName: string,
    recieverUsername: string,
    senderUsername: string,
    data: string | undefined,
    time: Number
  ) {
    this.eventName = eventName;
    this.recieverUsername = recieverUsername;
    this.senderUsername = senderUsername;
    this.data = data;
    this.time = time;
  }
  static fromJson(jsonObject: string): WSEvent {
    var map = JSON.parse(jsonObject);
    return new WSEvent(
      map["eventName"],
      map["recieverUsername"],
      map["senderUsername"],
      map["data"],
      map["time"]
    );
  }
  ///used
  toJson(): string {
    return JSON.stringify({
      eventName: this.eventName,
      recieverUsername: this.recieverUsername,
      senderUsername: this.senderUsername,
      data: this.data,
      time: this.time,
    });
  }
}
