import { Request, Response, NextFunction } from 'express'
import { ENV } from '../config/env'

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('[Error]', err?.message || err)
  res.status(500).json({
    error:   'Internal server error',
    details: err?.message || String(err),
  })
}
