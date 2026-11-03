"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
exports.handleAudio = handleAudio;
const ai_service_1 = require("../services/ai.service");
const srs_service_1 = require("../services/srs.service");
const models_1 = require("../models");
const uuid_1 = require("uuid");
const MAX_HISTORY = 10;
// ── POST /api/chat/message ─────────────────────────────────────────────────────
async function handleMessage(req, res, next) {
    try {
        const { text, userId, sessionId, scenario = 'free-talk' } = req.body;
        if (!text?.trim()) {
            res.status(400).json({ error: 'text is required' });
            return;
        }
        let userLevel = 'A1';
        let history = [];
        let session = null;
        // Safe DB access: if DB fails, fallback gracefully
        try {
            if (userId) {
                const [userRecord] = await models_1.User.findOrCreate({
                    where: { id: userId },
                    defaults: { id: userId, name: 'Learner', level: 'A1' },
                });
                userLevel = userRecord.level || 'A1';
                if (sessionId) {
                    session = (await models_1.Session.findByPk(sessionId)) ?? (await models_1.Session.create({ id: (0, uuid_1.v4)(), userId, taskType: scenario }));
                }
                else {
                    session = await models_1.Session.create({ id: (0, uuid_1.v4)(), userId, taskType: scenario });
                }
                if (session.context && Array.isArray(session.context)) {
                    history = session.context.slice(-MAX_HISTORY);
                }
            }
        }
        catch (dbErr) {
            console.warn('[DB non-critical warning]:', dbErr);
        }
        // Call AI with scenario and student level
        const aiResult = await (0, ai_service_1.processChat)(text, history, scenario, userLevel);
        // Save session context and vocab if DB is available
        try {
            if (session) {
                const updatedHistory = [
                    ...history,
                    { role: 'user', content: text },
                    { role: 'assistant', content: aiResult.message },
                ];
                await session.update({ context: updatedHistory });
            }
            if (userId && aiResult.vocabulary?.length) {
                await models_1.VocabItem.bulkCreate(aiResult.vocabulary.map((v) => ({
                    id: (0, uuid_1.v4)(),
                    userId,
                    word: v.word,
                    meaning: v.meaning,
                    example: v.example,
                    sessionId: session?.id ?? (0, uuid_1.v4)(),
                })));
                await (0, srs_service_1.createCardsFromVocab)(userId, aiResult.vocabulary.map((v) => ({
                    word: v.word,
                    meaning: v.meaning,
                    example: v.example,
                    sourceError: aiResult.correction?.original ?? '',
                })));
                await models_1.User.increment({ xp: 10 }, { where: { id: userId } });
            }
        }
        catch (saveErr) {
            console.warn('[Save warning]:', saveErr);
        }
        res.json({
            sessionId: session?.id ?? sessionId ?? (0, uuid_1.v4)(),
            message: aiResult.message,
            translation: aiResult.translation,
            suggestedReplies: aiResult.suggestedReplies,
            correction: aiResult.correction,
            vocabulary: aiResult.vocabulary,
            taskStatus: aiResult.taskStatus,
        });
    }
    catch (err) {
        next(err);
    }
}
// ── POST /api/chat/audio ───────────────────────────────────────────────────────
async function handleAudio(req, res, next) {
    try {
        const file = req.file;
        const userId = req.body.userId;
        const sessionId = req.body.sessionId;
        const scenario = req.body.scenario || 'free-talk';
        if (!file) {
            res.status(400).json({ error: 'No audio file received' });
            return;
        }
        const transcript = await (0, ai_service_1.transcribeAudio)(file.buffer);
        req.body.text = transcript;
        req.body.userId = userId;
        req.body.sessionId = sessionId;
        req.body.scenario = scenario;
        return handleMessage(req, res, next);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=chat.controller.js.map