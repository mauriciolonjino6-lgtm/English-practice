"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegister = loginOrRegister;
exports.getUser = getUser;
exports.updateUser = updateUser;
const models_1 = require("../models");
const uuid_1 = require("uuid");
async function loginOrRegister(req, res, next) {
    try {
        const { name, email, level = 'A1', goal = 'Daily Conversation' } = req.body;
        if (!name && !email) {
            res.status(400).json({ error: 'Name or email is required' });
            return;
        }
        let user = null;
        if (email?.trim()) {
            user = await models_1.User.findOne({ where: { email: email.trim().toLowerCase() } });
        }
        if (!user && name?.trim()) {
            user = await models_1.User.findOne({ where: { name: name.trim() } });
        }
        if (!user) {
            user = await models_1.User.create({
                id: (0, uuid_1.v4)(),
                name: name?.trim() || 'Learner',
                email: email?.trim().toLowerCase() || undefined,
                level: level || 'A1',
                goal: goal || 'Daily Conversation',
                xp: 10,
                streak: 1,
                lastSeen: new Date(),
            });
        }
        else {
            // Update last seen
            await user.update({ lastSeen: new Date() });
        }
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level,
                goal: user.goal,
                xp: user.xp,
                streak: user.streak,
            },
        });
    }
    catch (err) {
        next(err);
    }
}
async function getUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await models_1.User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { name, level, goal } = req.body;
        const user = await models_1.User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        await user.update({
            ...(name ? { name } : {}),
            ...(level ? { level } : {}),
            ...(goal ? { goal } : {}),
        });
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map