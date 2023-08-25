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
exports.SignUpRouter = void 0;
const express_1 = require("express");
const auth_token_1 = require("../utils/auth_token");
const password_hash_1 = require("../utils/password_hash");
const data_base_methods_1 = require("../utils/data_base_methods");
const exceptions_1 = require("../exception/exceptions");
const router = (0, express_1.Router)();
exports.SignUpRouter = router;
router.post("/auth/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, apptoken } = req.body;
    console.log(`${email} tried to sign up`);
    try {
        new password_hash_1.Password().hash(password).then((hashed) => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield (0, data_base_methods_1.registerUserDB)(email, username, hashed, apptoken);
            let token = new auth_token_1.Token().generate(user._id);
            console.log(user);
            res.status(200).json({ "user": user, "token": token });
        }));
    }
    catch (error) {
        if (error instanceof exceptions_1.DataBaseException) {
            res.status(500).json({ "error": error });
        }
        console.log(error.message);
    }
}));
