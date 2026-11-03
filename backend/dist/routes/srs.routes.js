"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const srs_controller_1 = require("../controllers/srs.controller");
const router = (0, express_1.Router)();
router.get('/due/:userId', srs_controller_1.getDue);
router.post('/review/:cardId', srs_controller_1.postReview);
exports.default = router;
//# sourceMappingURL=srs.routes.js.map