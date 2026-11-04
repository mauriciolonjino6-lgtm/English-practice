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
app.set('trust proxy', 1)

// ── Serverless Request Normalization (Ensures req.socket and connection are defined) ─
app.use((req, _res, next) => {
  if (!req.socket) req.socket = {} as any
  if (!req.connection) req.connection = req.socket
  if (!(req.connection as any).remoteAddress) {
    const forwarded = req.headers['x-forwarded-for']
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '127.0.0.1'
    ;(req.connection as any).remoteAddress = ip
  }
  next()
})

// ── Security & Middleware ──────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
}))

app.use(cors({
  origin: true,
  credentials: true,
}))

if (!process.env.VERCEL && ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Root & Instant Health Check (Responds immediately, zero dependencies) ─────
app.get(['/', '/api'], (_req, res) => {
  res.json({
    ok:           true,
    service:      'FluentAI Backend API',
    status:       'running',
    timestamp:    new Date().toISOString(),
  })
})

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

// ── Non-blocking Database Lazy Warm-up Middleware (Only for API routes) ───────
app.use((_req, _res, next) => {
  if (process.env.DATABASE_URL || ENV.DATABASE_URL) {
    connectDB().catch(() => {})
  }
  next()
})

// ── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max:      120,
  validate: false,
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

// ── Start Server (Only for local direct execution, never when required by Vercel) ─
if (require.main === module && !process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`[Server] running on http://localhost:${ENV.PORT}`)
  })
}

export default app
export { app }
