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
exports.aiRouter = void 0;
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
const openai_1 = require("openai");
const authentication_1 = require("../middlewares/authentication");
dotenv.config();
const configuration = new openai_1.Configuration({
    apiKey: process.env.openai_api_key,
});
const openai = new openai_1.OpenAIApi(configuration);
const router = (0, express_1.Router)();
exports.aiRouter = router;
router.post('/ai/generate', authentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const completion = yield openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(message),
        temperature: 0.84,
        max_tokens: 300,
        top_p: 1,
    });
    console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
}));
function generatePrompt(message) {
    return `
  Have a chat with me. act as a smart Rajappan who is an Artificial Intelligence
  me: what's the first letter of your name?
  AI_Rajappan: R
   ${message}   
   `;
}
