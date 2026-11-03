"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRSCard = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class SRSCard extends sequelize_1.Model {
}
exports.SRSCard = SRSCard;
SRSCard.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    front: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    back: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    example: { type: sequelize_1.DataTypes.TEXT, allowNull: false, defaultValue: '' },
    easeFactor: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 2.5 },
    interval: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1 },
    repetitions: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    nextReview: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    sourceError: { type: sequelize_1.DataTypes.TEXT, defaultValue: '' },
}, { sequelize: database_1.sequelize, tableName: 'srs_cards' });
//# sourceMappingURL=SRSCard.js.map