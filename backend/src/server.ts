import express from 'express'
import cors    from 'cors'
import helmet  from 'helmet'
import morgan  from 'morgan'
import rateLimit from 'express-rate-limit'
import path    from 'path'
import fs      from 'fs'
import { connectDB }    from './config/database'
import { ENV }          from './config/env'
import './models'
import routes           from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

// ── Security & Middleware ──────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
}))

app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(morgan(ENV.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Instant Health Check (Responds immediately, no DB blocking) ───────────────
app.get(['/health', '/api/health'], (_req, res) => {
  res.json({
    ok:           true,
    env:          ENV.NODE_ENV,
    hasDbUrl:     Boolean(process.env.DATABASE_URL || ENV.DATABASE_URL),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY),
    status:       'healthy',
    timestamp:    new Date().toISOString(),
  })
})

// ── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max:      120,
  message:  { error: 'Too many requests, slow down.' },
}))

// ── API Routes (Mounted on both /api and / to support all rewrite scenarios) ──
app.use('/api', routes)
app.use('/', routes)

// ── Static Frontend Serving (if running standalone server outside Vercel) ─────
if (!process.env.VERCEL) {
  const frontendDist = path.resolve(__dirname, '../../frontend/dist')
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist))
    app.get('*', (_req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'))
    })
  }
}

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use(errorHandler)

// ── Database Initialization (Non-blocking background warm-up) ─────────────────
if (process.env.DATABASE_URL || ENV.DATABASE_URL) {
  connectDB().catch((err: any) => {
    console.warn('[DB] Background connection notice:', err?.message || err)
  })
}

// ── Start Server (Only for non-serverless environments) ────────────────────────
if (!process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`[Server] running on http://localhost:${ENV.PORT}`)
  })
}

export default app
export { app }
