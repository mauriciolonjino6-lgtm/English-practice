import 'dotenv/config'

export const ENV = {
  PORT:           parseInt(process.env.PORT ?? '3001'),
  NODE_ENV:       process.env.NODE_ENV ?? 'development',
  DATABASE_URL:   process.env.DATABASE_URL,
  DB_HOST:        process.env.DB_HOST ?? 'localhost',
  DB_PORT:        parseInt(process.env.DB_PORT ?? '5432'),
  DB_NAME:        process.env.DB_NAME ?? 'english_app',
  DB_USER:        process.env.DB_USER ?? 'postgres',
  DB_PASS:        process.env.DB_PASS ?? '',
  DB_SSL:         process.env.DB_SSL === 'true' || Boolean(process.env.DATABASE_URL?.includes('neon.tech') || process.env.DATABASE_URL?.includes('sslmode=require')),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? '',
  GEMINI_MODEL:   process.env.GEMINI_MODEL ?? 'gemini-1.5-pro',
  FRONTEND_URL:   process.env.FRONTEND_URL ?? 'http://localhost:5173',
} as const
