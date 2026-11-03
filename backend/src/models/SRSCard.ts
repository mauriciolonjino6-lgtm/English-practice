import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface SRSCardAttribs {
  id:          string
  userId:      string
  front:       string
  back:        string
  example:     string
  easeFactor:  number
  interval:    number
  repetitions: number
  nextReview:  Date
  sourceError: string
  createdAt?:  Date
  updatedAt?:  Date
}

type SRSCreation = Optional<SRSCardAttribs, 'id' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'sourceError'>

export class SRSCard extends Model<SRSCardAttribs, SRSCreation> implements SRSCardAttribs {
  declare id:          string
  declare userId:      string
  declare front:       string
  declare back:        string
  declare example:     string
  declare easeFactor:  number
  declare interval:    number
  declare repetitions: number
  declare nextReview:  Date
  declare sourceError: string
}

SRSCard.init(
  {
    id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId:      { type: DataTypes.UUID, allowNull: false },
    front:       { type: DataTypes.STRING(500), allowNull: false },
    back:        { type: DataTypes.TEXT, allowNull: false },
    example:     { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    easeFactor:  { type: DataTypes.FLOAT, defaultValue: 2.5 },
    interval:    { type: DataTypes.INTEGER, defaultValue: 1 },
    repetitions: { type: DataTypes.INTEGER, defaultValue: 0 },
    nextReview:  { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    sourceError: { type: DataTypes.TEXT, defaultValue: '' },
  },
  { sequelize, tableName: 'srs_cards' }
)
