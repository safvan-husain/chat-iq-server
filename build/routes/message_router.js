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
exports.messageRouter = void 0;
const express_1 = require("express");
const data_base_methods_1 = require("../utils/data_base_methods");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.post('/messages', authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reciever, message } = req.body;
    try {
        yield (0, data_base_methods_1.saveMessageDB)(req.userID, reciever, message);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(504).json({ "error": error });
    }
}));
router.get('/message', authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let messages = yield (0, data_base_methods_1.getAllUnredMessagesDB)(req.userID);
        res.status(200).json(messages);
        yield (0, data_base_methods_1.markMessagesReaded)(messages);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
router.delete('/message', authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('delete');
        yield (0, data_base_methods_1.deleteMessagesDB)(req.userID);
        res.status(200).send("deleted successfully");
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
