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
exports.DataRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const user_model_1 = require("../model/user_model");
const router = (0, express_1.Router)();
exports.DataRouter = router;
router.get("/get-data/all-user", authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield user_model_1.UserModel.find();
        let user = yield user_model_1.UserModel.findById(req.userID);
        users = users.filter((x) => x.username != user.username);
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}));
