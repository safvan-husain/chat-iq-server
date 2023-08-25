"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSEvent = void 0;
class WSEvent {
    constructor(eventName, recieverUsername, senderUsername, data, time) {
        this.eventName = eventName;
        this.recieverUsername = recieverUsername;
        this.senderUsername = senderUsername;
        this.data = data;
        this.time = time;
    }
    static fromJson(jsonObject) {
        var map = JSON.parse(jsonObject);
        return new WSEvent(map["eventName"], map["recieverUsername"], map["senderUsername"], map["data"], map["time"]);
    }
    ///used
    toJson() {
        return JSON.stringify({
            eventName: this.eventName,
            recieverUsername: this.recieverUsername,
            senderUsername: this.senderUsername,
            data: this.data,
            time: this.time,
        });
    }
}
exports.WSEvent = WSEvent;
