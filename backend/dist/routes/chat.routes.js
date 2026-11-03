"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const chat_controller_1 = require("../controllers/chat.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
router.post('/message', chat_controller_1.handleMessage);
router.post('/audio', upload.single('audio'), chat_controller_1.handleAudio);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map