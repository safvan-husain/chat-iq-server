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
exports.ProfileRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const user_model_1 = require("../model/user_model");
const push_notification_1 = require("../utils/push_notification");
const router = (0, express_1.Router)();
exports.ProfileRouter = router;
router.post("/profile/change-dp", authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { avatar } = req.body;
    try {
        let user = yield user_model_1.UserModel.findById(req.userID);
        if (user != null) {
            user.avatar = avatar;
            user = yield user.save();
            res.status(200).json(user);
        }
        else {
            console.log("user not found");
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.post("/app-token", authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { app_token } = req.body;
    console.log(app_token);
    try {
        let user = yield user_model_1.UserModel.findById(req.userID);
        if (user != null) {
            user.appToken = app_token;
            user = yield user.save();
            res.status(200).json(user);
        }
        else {
            res.status(400);
            console.log("user not found");
        }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/sendmessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, push_notification_1.sendMessage)({
        title: "heej",
        body: "husain nothing  in here",
        username: "safvanHusian",
    });
    res.send("mm");
}));
