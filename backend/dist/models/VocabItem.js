"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class VocabItem extends sequelize_1.Model {
}
exports.VocabItem = VocabItem;
VocabItem.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    word: { type: sequelize_1.DataTypes.STRING(200), allowNull: false },
    meaning: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    example: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    sessionId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, { sequelize: database_1.sequelize, tableName: 'vocab_items', updatedAt: false });
//# sourceMappingURL=VocabItem.js.map