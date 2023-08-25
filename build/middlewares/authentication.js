"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_token_1 = require("../utils/auth_token");
const auth = (req, res, next) => {
    var userID = new auth_token_1.Token().getUserIdFromToken(req.headers["x-auth-token"]);
    if (userID) {
        req.userID = userID;
        next();
    }
    else {
        res.status(401).json({ message: "Invalid Token" });
    }
};
exports.auth = auth;
