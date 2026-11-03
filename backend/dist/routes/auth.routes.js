"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.loginOrRegister);
router.post('/register', auth_controller_1.loginOrRegister);
router.get('/user/:id', auth_controller_1.getUser);
router.put('/user/:id', auth_controller_1.updateUser);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map