"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onWebSocket = void 0;
const push_notification_1 = require("./push_notification");
const ws_event_1 = require("./ws_event");
const data_base_methods_1 = require("./data_base_methods");
function onWebSocket(wss) {
    var webSockets = {};
    var conected_devices = [];
    wss.on("connection", function (ws, req) {
        var userID = req.url.substr(1); //get userid from URL/userid
        webSockets[userID] = ws; //add new user to the connection list
        if (!conected_devices.includes(userID)) {
            conected_devices.push(userID);
            console.log(conected_devices);
            for (const userID in webSockets) {
                //sending to every client in the network
                webSockets[userID].send(JSON.stringify({
                    cmd: "connected_devices",
                    connected_devices: conected_devices,
                }));
            }
        }
        ws.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (message.toString()[0] === "{") {
                var ws_event = ws_event_1.WSEvent.fromJson(message.toString());
                // console.log(ws_event.message);
                var reciever = webSockets[ws_event.recieverUsername];
                if (reciever != null) {
                    console.log(`${ws_event.eventName} from ${ws_event.senderUsername} to ${ws_event.recieverUsername}`);
                    switch (ws_event.eventName) {
                        case "message":
                            (0, push_notification_1.sendMessage)({
                                title: ws_event.senderUsername,
                                body: (_a = ws_event.data) !== null && _a !== void 0 ? _a : "",
                                username: ws_event.recieverUsername,
                            });
                            var response = ws_event.toJson();
                            reciever.send(response);
                            break;
                        default:
                            reciever.send(ws_event.toJson());
                            break;
                    }
                }
                else {
                    if (ws_event.eventName === "message") {
                        console.log(ws_event.data);
                        (0, push_notification_1.sendMessage)({
                            title: ws_event.senderUsername,
                            body: (_b = ws_event.data) !== null && _b !== void 0 ? _b : "",
                            username: ws_event.recieverUsername,
                        });
                        (0, data_base_methods_1.saveMessageDB)(ws_event.senderUsername, ws_event.recieverUsername, (_c = ws_event.data) !== null && _c !== void 0 ? _c : "", true);
                    }
                    else if (ws_event.eventName === "request") {
                        (0, push_notification_1.makeCall)(ws_event.recieverUsername, ws_event.senderUsername);
                    }
                }
            }
        }));
        ws.on("close", function () {
            var userID = req.url.substr(1);
            delete webSockets[userID]; //on connection close, remove reciver from connection list
            console.log("User Disconnected: " + userID);
            var index = conected_devices.indexOf(userID);
            if (index > -1) {
                conected_devices.splice(index, 1);
            }
            console.log(conected_devices);
            for (const userID in webSockets) {
                //sending to every client in the network
                webSockets[userID].send(JSON.stringify({
                    cmd: "connected_devices",
                    connected_devices: conected_devices,
                }));
            }
        });
        ws.send(JSON.stringify({ cmd: "connected" }));
    });
}
exports.onWebSocket = onWebSocket;
