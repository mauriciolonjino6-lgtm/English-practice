import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface VocabAttribs {
  id:        string
  userId:    string
  word:      string
  meaning:   string
  example:   string
  sessionId: string
  createdAt?: Date
}

type VocabCreation = Optional<VocabAttribs, 'id'>

export class VocabItem extends Model<VocabAttribs, VocabCreation> implements VocabAttribs {
  declare id:        string
  declare userId:    string
  declare word:      string
  declare meaning:   string
  declare example:   string
  declare sessionId: string
}

VocabItem.init(
  {
    id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId:    { type: DataTypes.UUID, allowNull: false },
    word:      { type: DataTypes.STRING(200), allowNull: false },
    meaning:   { type: DataTypes.TEXT, allowNull: false },
    example:   { type: DataTypes.TEXT, allowNull: false },
    sessionId: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: 'vocab_items', updatedAt: false }
)
