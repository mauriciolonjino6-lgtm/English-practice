import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface UserAttribs {
  id:        string
  name:      string
  email?:    string
  level:     string
  goal?:     string
  xp:        number
  streak:    number
  lastSeen:  Date
  createdAt?: Date
  updatedAt?: Date
}

type UserCreation = Optional<UserAttribs, 'xp' | 'streak' | 'lastSeen' | 'email' | 'goal'>

export class User extends Model<UserAttribs, UserCreation> implements UserAttribs {
  declare id:       string
  declare name:     string
  declare email?:   string
  declare level:    string
  declare goal?:    string
  declare xp:       number
  declare streak:   number
  declare lastSeen: Date
  declare createdAt: Date
  declare updatedAt: Date
}

User.init(
  {
    id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name:     { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Learner' },
    email:    { type: DataTypes.STRING(200), allowNull: true },
    level:    { type: DataTypes.STRING(10), defaultValue: 'A1' },
    goal:     { type: DataTypes.STRING(100), defaultValue: 'Daily Conversation' },
    xp:       { type: DataTypes.INTEGER, defaultValue: 0 },
    streak:   { type: DataTypes.INTEGER, defaultValue: 0 },
    lastSeen: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'users' }
)
