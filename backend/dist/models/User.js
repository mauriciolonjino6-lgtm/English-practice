"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, defaultValue: 'Learner' },
    email: { type: sequelize_1.DataTypes.STRING(200), allowNull: true },
    level: { type: sequelize_1.DataTypes.STRING(10), defaultValue: 'A1' },
    goal: { type: sequelize_1.DataTypes.STRING(100), defaultValue: 'Daily Conversation' },
    xp: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    streak: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    lastSeen: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, { sequelize: database_1.sequelize, tableName: 'users' });
//# sourceMappingURL=User.js.map