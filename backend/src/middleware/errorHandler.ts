import { Request, Response, NextFunction } from 'express'
import { ENV } from '../config/env'

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('[Error]', err.message)
  res.status(500).json({
    error:   'Internal server error',
    details: ENV.NODE_ENV === 'development' ? err.message : undefined,
  })
}
