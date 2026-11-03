import { Request, Response, NextFunction } from 'express'
import { processChat, transcribeAudio, AIMessageItem } from '../services/ai.service'
import { createCardsFromVocab } from '../services/srs.service'
import { Session, VocabItem, User } from '../models'
import { v4 as uuidv4 } from 'uuid'

const MAX_HISTORY = 10

// ── POST /api/chat/message ─────────────────────────────────────────────────────
export async function handleMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const { text, userId, sessionId, scenario = 'free-talk' } = req.body as {
      text:      string
      userId:    string
      sessionId: string | null
      scenario?: string
    }

    if (!text?.trim()) {
      res.status(400).json({ error: 'text is required' })
      return
    }

    let userLevel = 'A1'
    let history: AIMessageItem[] = []
    let session: Session | null = null

    // Safe DB access: if DB fails, fallback gracefully
    try {
      if (userId) {
        const [userRecord] = await User.findOrCreate({
          where: { id: userId },
          defaults: { id: userId, name: 'Learner', level: 'A1' },
        })
        userLevel = userRecord.level || 'A1'

        if (sessionId) {
          session = (await Session.findByPk(sessionId)) ?? (await Session.create({ id: uuidv4(), userId, taskType: scenario }))
        } else {
          session = await Session.create({ id: uuidv4(), userId, taskType: scenario })
        }

        if (session.context && Array.isArray(session.context)) {
          history = (session.context as AIMessageItem[]).slice(-MAX_HISTORY)
        }
      }
    } catch (dbErr) {
      console.warn('[DB non-critical warning]:', dbErr)
    }

    // Call AI with scenario and student level
    const aiResult = await processChat(text, history, scenario, userLevel)

    // Save session context and vocab if DB is available
    try {
      if (session) {
        const updatedHistory: AIMessageItem[] = [
          ...history,
          { role: 'user',      content: text },
          { role: 'assistant', content: aiResult.message },
        ]
        await session.update({ context: updatedHistory })
      }

      if (userId && aiResult.vocabulary?.length) {
        await VocabItem.bulkCreate(
          aiResult.vocabulary.map((v) => ({
            id:        uuidv4(),
            userId,
            word:      v.word,
            meaning:   v.meaning,
            example:   v.example,
            sessionId: session?.id ?? uuidv4(),
          }))
        )

        await createCardsFromVocab(
          userId,
          aiResult.vocabulary.map((v) => ({
            word:        v.word,
            meaning:     v.meaning,
            example:     v.example,
            sourceError: aiResult.correction?.original ?? '',
          }))
        )

        await User.increment({ xp: 10 }, { where: { id: userId } })
      }
    } catch (saveErr) {
      console.warn('[Save warning]:', saveErr)
    }

    res.json({
      sessionId:        session?.id ?? sessionId ?? uuidv4(),
      message:          aiResult.message,
      translation:      aiResult.translation,
      suggestedReplies: aiResult.suggestedReplies,
      correction:       aiResult.correction,
      vocabulary:       aiResult.vocabulary,
      taskStatus:       aiResult.taskStatus,
    })
  } catch (err) {
    next(err)
  }
}

// ── POST /api/chat/audio ───────────────────────────────────────────────────────
export async function handleAudio(req: Request, res: Response, next: NextFunction) {
  try {
    const file      = req.file
    const userId    = req.body.userId as string
    const sessionId = req.body.sessionId as string | null
    const scenario  = (req.body.scenario as string) || 'free-talk'

    if (!file) {
      res.status(400).json({ error: 'No audio file received' })
      return
    }

    const transcript = await transcribeAudio(file.buffer)

    req.body.text      = transcript
    req.body.userId    = userId
    req.body.sessionId = sessionId
    req.body.scenario  = scenario
    return handleMessage(req, res, next)
  } catch (err) {
    next(err)
  }
}
