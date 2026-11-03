"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Session extends sequelize_1.Model {
}
exports.Session = Session;
Session.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    context: { type: sequelize_1.DataTypes.JSONB, defaultValue: [] },
    taskType: { type: sequelize_1.DataTypes.STRING(50), defaultValue: 'free-talk' },
}, { sequelize: database_1.sequelize, tableName: 'sessions' });
//# sourceMappingURL=Session.js.map