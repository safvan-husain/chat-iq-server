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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const websocket = __importStar(require("ws"));
const sign_in_route_1 = require("./routes/sign_in_route");
const body_parser_1 = __importDefault(require("body-parser"));
const sign_up_route_1 = require("./routes/sign_up_route");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const get_data_1 = require("./routes/get_data");
const web_socket_1 = require("./utils/web_socket");
const user_account_1 = require("./routes/user_account");
const message_router_1 = require("./routes/message_router");
dotenv.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public-flutter")));
app.use(sign_in_route_1.SigninRouter);
app.use(sign_up_route_1.SignUpRouter);
app.use(message_router_1.messageRouter);
app.use(get_data_1.DataRouter);
app.use(user_account_1.ProfileRouter);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public-flutter", "index.html"));
});
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(process.env.MongoUrl, () => {
    console.log(mongoose_1.default.connection.readyState == 1
        ? "MongoDB connected!"
        : "MongoDB Not connected!");
});
const server = app.listen(process.env.PORT || 3000, function () {
    console.log("port lisenting on " + process.env.PORT);
});
const wss = new websocket.Server({ server });
(0, web_socket_1.onWebSocket)(wss);
