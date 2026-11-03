import { Request, Response, NextFunction } from 'express'
import { getDueCards, applyReview } from '../services/srs.service'

// GET /api/srs/due/:userId
export async function getDue(req: Request, res: Response, next: NextFunction) {
  try {
    const cards = await getDueCards(req.params.userId)
    res.json(cards)
  } catch (err) { next(err) }
}

// POST /api/srs/review/:cardId  { grade: 0-5 }
export async function postReview(req: Request, res: Response, next: NextFunction) {
  try {
    const grade = Number(req.body.grade)
    if (isNaN(grade) || grade < 0 || grade > 5) {
      res.status(400).json({ error: 'grade must be 0-5' })
      return
    }
    const card = await applyReview(req.params.cardId, grade)
    res.json(card)
  } catch (err) { next(err) }
}
