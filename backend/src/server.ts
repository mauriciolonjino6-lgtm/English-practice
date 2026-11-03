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

const allowedOrigins = ENV.FRONTEND_URL ? ENV.FRONTEND_URL.split(',').map((u) => u.trim()) : ['*']
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(null, true)
  },
  credentials: true,
}))

app.use(morgan(ENV.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Instant Health Check ──────────────────────────────────────────────────────
app.get(['/health', '/api/health'], (_req, res) => {
  res.json({
    ok:           true,
    env:          ENV.NODE_ENV,
    hasDbUrl:     Boolean(ENV.DATABASE_URL),
    hasGeminiKey: Boolean(ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY !== 'AI...'),
    status:       'healthy',
  })
})

// ── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max:      120,
  message:  { error: 'Too many requests, slow down.' },
}))

// ── Ensure DB Connection in background ────────────────────────────────────────
connectDB().catch((err) => console.warn('[DB Background Warning]:', err))

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

// ── Start Server ──────────────────────────────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`[Server] running on http://localhost:${ENV.PORT}`)
  })
}

export default app
export { app }
