"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sm2 = sm2;
exports.getDueCards = getDueCards;
exports.applyReview = applyReview;
exports.createCardsFromVocab = createCardsFromVocab;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
// SM-2 Algorithm implementation
// Grade: 0-5 (0=blackout, 3=correct with difficulty, 5=perfect)
function sm2(grade, repetitions, easeFactor, interval) {
    let newReps = repetitions;
    let newEF = easeFactor;
    let newInt = interval;
    if (grade >= 3) {
        if (newReps === 0)
            newInt = 1;
        else if (newReps === 1)
            newInt = 6;
        else
            newInt = Math.round(newInt * newEF);
        newReps += 1;
    }
    else {
        newReps = 0;
        newInt = 1;
    }
    newEF = Math.max(1.3, newEF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInt);
    return { repetitions: newReps, easeFactor: newEF, interval: newInt, nextReview };
}
async function getDueCards(userId) {
    return models_1.SRSCard.findAll({
        where: {
            userId,
            nextReview: { [sequelize_1.Op.lte]: new Date() },
        },
        order: [['nextReview', 'ASC']],
        limit: 20,
    });
}
async function applyReview(cardId, grade) {
    const card = await models_1.SRSCard.findByPk(cardId);
    if (!card)
        throw new Error(`Card ${cardId} not found`);
    const result = sm2(grade, card.repetitions, card.easeFactor, card.interval);
    await card.update(result);
    return card;
}
async function createCardsFromVocab(userId, items) {
    await models_1.SRSCard.bulkCreate(items.map((it) => ({
        userId,
        front: it.word,
        back: it.meaning,
        example: it.example,
        sourceError: it.sourceError ?? '',
    })));
}
//# sourceMappingURL=srs.service.js.map