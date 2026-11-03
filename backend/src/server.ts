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

const allowedOrigins = ENV.FRONTEND_URL ? ENV.FRONTEND_URL.split(',').map((u) => u.trim()) : ['http://localhost:5173']
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

// Rate limiting
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  max:      100,
  message:  { error: 'Too many requests, slow down.' },
}))

// ── Database Connection Middleware for Serverless (Vercel) ────────────────────
let dbConnected = false
let dbPromise: Promise<void> | null = null

const ensureDB = async (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
  if (dbConnected) return next()
  if (!dbPromise) {
    dbPromise = connectDB()
      .then(() => { dbConnected = true })
      .catch((err) => {
        dbPromise = null
        throw err
      })
  }
  try {
    await dbPromise
    next()
  } catch (err) {
    next(err)
  }
}

app.use('/api', ensureDB)

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api', routes)

app.get('/health', (_req, res) => res.json({ ok: true, env: ENV.NODE_ENV, status: 'healthy' }))

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

// ── Start Server (Local / Render / Railway) ───────────────────────────────────
if (!process.env.VERCEL) {
  ;(async () => {
    await connectDB()
    app.listen(ENV.PORT, () => {
      console.log(`[Server] running on http://localhost:${ENV.PORT}`)
    })
  })()
}

export default app
export { app }
