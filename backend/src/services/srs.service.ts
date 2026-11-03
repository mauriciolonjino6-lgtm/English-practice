import { SRSCard } from '../models'
import { Op } from 'sequelize'

// SM-2 Algorithm implementation
// Grade: 0-5 (0=blackout, 3=correct with difficulty, 5=perfect)
export function sm2(
  grade:       number,
  repetitions: number,
  easeFactor:  number,
  interval:    number
): { repetitions: number; easeFactor: number; interval: number; nextReview: Date } {
  let newReps = repetitions
  let newEF   = easeFactor
  let newInt  = interval

  if (grade >= 3) {
    if (newReps === 0)      newInt = 1
    else if (newReps === 1) newInt = 6
    else                    newInt = Math.round(newInt * newEF)
    newReps += 1
  } else {
    newReps = 0
    newInt  = 1
  }

  newEF = Math.max(1.3, newEF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)))

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInt)

  return { repetitions: newReps, easeFactor: newEF, interval: newInt, nextReview }
}

export async function getDueCards(userId: string): Promise<SRSCard[]> {
  try {
    return await SRSCard.findAll({
      where: {
        userId,
        nextReview: { [Op.lte]: new Date() },
      },
      order: [['nextReview', 'ASC']],
      limit: 20,
    })
  } catch (err) {
    console.warn('[SRS getDueCards fallback]:', err)
    return []
  }
}

export async function applyReview(cardId: string, grade: number): Promise<SRSCard> {
  const card = await SRSCard.findByPk(cardId)
  if (!card) throw new Error(`Card ${cardId} not found`)

  const result = sm2(grade, card.repetitions, card.easeFactor, card.interval)
  await card.update(result)
  return card
}

export async function createCardsFromVocab(
  userId:  string,
  items:   { word: string; meaning: string; example: string; sourceError?: string }[]
): Promise<void> {
  try {
    await SRSCard.bulkCreate(
      items.map((it) => ({
        userId,
        front:       it.word,
        back:        it.meaning,
        example:     it.example,
        sourceError: it.sourceError ?? '',
      }))
    )
  } catch (err) {
    console.warn('[SRS bulkCreate fallback]:', err)
  }
}
