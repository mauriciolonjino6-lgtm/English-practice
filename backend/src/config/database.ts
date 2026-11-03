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

export const sequelize = ENV.DATABASE_URL
  ? new Sequelize(ENV.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: sslOptions,
      logging: ENV.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max:     5,
        min:     0,
        acquire: 30_000,
        idle:    10_000,
      },
      define: {
        underscored: true,
        timestamps:  true,
      },
    })
  : new Sequelize({
      dialect:  'postgres',
      host:     ENV.DB_HOST,
      port:     ENV.DB_PORT,
      database: ENV.DB_NAME,
      username: ENV.DB_USER,
      password: ENV.DB_PASS,
      dialectOptions: sslOptions,
      logging:  ENV.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max:     5,
        min:     0,
        acquire: 30_000,
        idle:    10_000,
      },
      define: {
        underscored: true,
        timestamps:  true,
      },
    })

let isConnected = false

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true

  // If no database URL is set at all, log warning and don't crash
  if (!ENV.DATABASE_URL && (!ENV.DB_HOST || ENV.DB_HOST === 'localhost') && process.env.NODE_ENV === 'production') {
    console.warn('[DB] DATABASE_URL is not set. Database operations will fail until configured in Vercel/Render.')
    return false
  }

  try {
    await sequelize.authenticate()
    console.log('[DB] PostgreSQL connected successfully')
    await sequelize.sync({ alter: true })
    console.log('[DB] Models synced successfully')
    isConnected = true
    return true
  } catch (err) {
    console.error('[DB] Connection warning:', err)
    // NEVER call process.exit(1) in cloud/serverless environments!
    return false
  }
}
