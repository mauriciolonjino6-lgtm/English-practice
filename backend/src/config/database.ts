import { Sequelize } from 'sequelize'
import { ENV } from './env'

const sslOptions = ENV.DB_SSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : undefined

const hasValidDb = Boolean(process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost'))

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: sslOptions,
      logging: false,
      pool: {
        max:     3,
        min:     0,
        acquire: 4000,
        idle:    5000,
      },
      define: {
        underscored: true,
        timestamps:  true,
      },
    })
  : new Sequelize({
      dialect:  'postgres',
      host:     process.env.DB_HOST || 'localhost',
      port:     parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'english_app',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      dialectOptions: sslOptions,
      logging:  false,
      pool: {
        max:     3,
        min:     0,
        acquire: 4000,
        idle:    5000,
      },
      define: {
        underscored: true,
        timestamps:  true,
      },
    })

let isConnected = false
let connectPromise: Promise<boolean> | null = null

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true
  if (!hasValidDb) {
    console.warn('[DB] No remote DATABASE_URL configured. Running without persistent database.')
    return false
  }

  if (connectPromise) return connectPromise

  connectPromise = (async () => {
    try {
      await sequelize.authenticate()
      console.log('[DB] PostgreSQL connected successfully')
      isConnected = true
      return true
    } catch (err: any) {
      console.error('[DB] Connection warning:', err?.message || err)
      return false
    } finally {
      connectPromise = null
    }
  })()

  return connectPromise
}
