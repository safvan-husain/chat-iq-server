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
exports.markMessagesReaded = exports.getAllUnredMessagesDB = exports.saveMessageDB = exports.deleteMessagesDB = exports.registerUserDB = void 0;
const exceptions_1 = require("../exception/exceptions");
const message_model_1 = require("../model/message_model");
const user_model_1 = require("../model/user_model");
function saveMessageDB(id, recieverUsername, messageText, isIdUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            if (isIdUsername) {
                user = yield user_model_1.UserModel.findOne({ username: id });
            }
            else {
                user = yield user_model_1.UserModel.findById(id);
            }
            let reciever = yield user_model_1.UserModel.findOne({ username: recieverUsername });
            if (user && reciever) {
                let message = new message_model_1.MessageModel({
                    senderId: user.username,
                    receiverId: recieverUsername,
                    msgText: messageText,
                });
                console.log(message);
                yield message.save();
                console.log("messege saved");
            }
        }
        catch (error) {
            console.log(error);
            throw new exceptions_1.DataBaseException();
        }
    });
}
exports.saveMessageDB = saveMessageDB;
function deleteAllMessagesDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_model_1.UserModel.findById(id);
            if (user) {
                let messages = yield message_model_1.MessageModel.find({ senderId: user.username });
                for (let message of messages) {
                    yield message_model_1.MessageModel.findByIdAndDelete(message._id);
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new exceptions_1.DataBaseException();
        }
    });
}
exports.deleteMessagesDB = deleteAllMessagesDB;
function getAllUnredMessagesDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_model_1.UserModel.findById(id);
            if (user) {
                return yield message_model_1.MessageModel.find({
                    receiverId: user.username,
                    isRead: false,
                });
            }
            throw new exceptions_1.DataBaseException();
        }
        catch (error) {
            console.log(error);
            throw new exceptions_1.DataBaseException();
        }
    });
}
exports.getAllUnredMessagesDB = getAllUnredMessagesDB;
function registerUserDB(email, username, password, apptoken) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_model_1.UserModel({
            username: username,
            email: email,
            password: password,
            isOnline: false,
            appToken: apptoken,
        });
        try {
            user.save();
            return user;
        }
        catch (error) {
            console.log(error);
            throw new exceptions_1.DataBaseException();
        }
    });
}
exports.registerUserDB = registerUserDB;
function markMessagesReaded(messages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let message of messages) {
                message.isRead = true;
                yield message.save();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.markMessagesReaded = markMessagesReaded;
