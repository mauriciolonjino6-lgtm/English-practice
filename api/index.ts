import type { Request, Response } from 'express'

let app: any = null
let initError: any = null

try {
  const mod = require('../backend/dist/server')
  app = mod.default || mod
} catch (err1: any) {
  try {
    const mod2 = require('../backend/src/server')
    app = mod2.default || mod2
  } catch (err2: any) {
    initError = {
      distError: err1?.message || String(err1),
      srcError:  err2?.message || String(err2),
      stack:     err2?.stack || err1?.stack,
    }
  }
}

export default function handler(req: Request, res: Response) {
  if (initError) {
    return res.status(500).json({
      error: 'Backend Initialization Error on Vercel',
      details: initError,
    })
  }

  if (typeof app === 'function') {
    return app(req, res)
  }

  return res.status(500).json({
    error: 'App is not an express handler',
    typeofApp: typeof app,
  })
}
