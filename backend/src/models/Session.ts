import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface SessionAttribs {
  id:        string
  userId:    string
  context:   object   // stores last N messages for AI context
  taskType:  string
  createdAt?: Date
  updatedAt?: Date
}

type SessionCreation = Optional<SessionAttribs, 'context' | 'taskType'>

export class Session extends Model<SessionAttribs, SessionCreation> implements SessionAttribs {
  declare id:       string
  declare userId:   string
  declare context:  object
  declare taskType: string
}

Session.init(
  {
    id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId:   { type: DataTypes.UUID, allowNull: false },
    context:  { type: DataTypes.JSONB, defaultValue: [] },
    taskType: { type: DataTypes.STRING(50), defaultValue: 'free-talk' },
  },
  { sequelize, tableName: 'sessions' }
)
