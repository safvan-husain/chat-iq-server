"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.makeCall = exports.sendMessage = void 0;
const user_model_1 = require("../model/user_model");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var FCM = require('fcm-node');
var serverKey = process.env.ServerKey;
var fcm = new FCM(serverKey);
// Send message
function sendMessage({ title, body, username }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('send message caled');
        try {
            var user = yield user_model_1.UserModel.findOne({ username: username });
            var event = {
                to: user === null || user === void 0 ? void 0 : user.appToken,
                notification: {
                    title: title,
                    body: body
                },
            };
            fcm.send(event, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                    console.log(err);
                }
                else {
                    console.log(`Successfully sent to ${user === null || user === void 0 ? void 0 : user.username}: `, response);
                    console.log(response.results);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendMessage = sendMessage;
// Send message
function makeCall(username, caller) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(' make caled');
        try {
            var user = yield user_model_1.UserModel.findOne({ username: username });
            var event = {
                to: user === null || user === void 0 ? void 0 : user.appToken,
                data: {
                    caller: caller,
                    event: "incomingCall"
                }
            };
            fcm.send(event, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                    console.log(err);
                }
                else {
                    console.log(`Successfully sent to ${user === null || user === void 0 ? void 0 : user.username}: `, response);
                    console.log(response.results);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.makeCall = makeCall;
