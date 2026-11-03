"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDue = getDue;
exports.postReview = postReview;
const srs_service_1 = require("../services/srs.service");
// GET /api/srs/due/:userId
async function getDue(req, res, next) {
    try {
        const cards = await (0, srs_service_1.getDueCards)(req.params.userId);
        res.json(cards);
    }
    catch (err) {
        next(err);
    }
}
// POST /api/srs/review/:cardId  { grade: 0-5 }
async function postReview(req, res, next) {
    try {
        const grade = Number(req.body.grade);
        if (isNaN(grade) || grade < 0 || grade > 5) {
            res.status(400).json({ error: 'grade must be 0-5' });
            return;
        }
        const card = await (0, srs_service_1.applyReview)(req.params.cardId, grade);
        res.json(card);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=srs.controller.js.map