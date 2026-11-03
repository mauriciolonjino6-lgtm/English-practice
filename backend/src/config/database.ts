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
        max:     10,
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
        max:     10,
        min:     0,
        acquire: 30_000,
        idle:    10_000,
      },
      define: {
        underscored: true,
        timestamps:  true,
      },
    })

export async function connectDB(): Promise<void> {
  try {
    await sequelize.authenticate()
    console.log('[DB] PostgreSQL connected successfully')
    // sync creates or alters tables to match the defined models
    await sequelize.sync({ alter: true })
    console.log('[DB] Models synced successfully')
  } catch (err) {
    console.error('[DB] Connection failed:', err)
    process.exit(1)
  }
}
