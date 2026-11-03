import { Request, Response, NextFunction } from 'express'
import { processChat, transcribeAudio, AIMessageItem } from '../services/ai.service'
import { createCardsFromVocab } from '../services/srs.service'
import { Session, VocabItem, User } from '../models'
import { v4 as uuidv4 } from 'uuid'

const MAX_HISTORY = 10  // last N turns kept in context

// ── POST /api/chat/message ─────────────────────────────────────────────────────
export async function handleMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const { text, userId, sessionId } = req.body as {
      text:      string
      userId:    string
      sessionId: string | null
    }

    if (!text?.trim()) {
      res.status(400).json({ error: 'text is required' })
      return
    }

    // Upsert user
    await User.findOrCreate({ where: { id: userId }, defaults: { id: userId, name: 'Learner', level: 'A1' } })

    // Retrieve or create session
    let session: Session
    if (sessionId) {
      session = (await Session.findByPk(sessionId)) ?? await Session.create({ id: uuidv4(), userId })
    } else {
      session = await Session.create({ id: uuidv4(), userId })
    }

    const history = (session.context as AIMessageItem[]).slice(-MAX_HISTORY)

    // Call AI
    const aiResult = await processChat(text, history)

    // Update session context
    const updatedHistory: AIMessageItem[] = [
      ...history,
      { role: 'user',      content: text },
      { role: 'assistant', content: aiResult.message },
    ]
    await session.update({ context: updatedHistory })

    // Save vocabulary items
    if (aiResult.vocabulary?.length) {
      await VocabItem.bulkCreate(
        aiResult.vocabulary.map((v) => ({
          id:        uuidv4(),
          userId,
          word:      v.word,
          meaning:   v.meaning,
          example:   v.example,
          sessionId: session.id,
        }))
      )

      // Auto-create SRS cards from new vocab
      await createCardsFromVocab(
        userId,
        aiResult.vocabulary.map((v) => ({
          word:        v.word,
          meaning:     v.meaning,
          example:     v.example,
          sourceError: aiResult.correction?.original ?? '',
        }))
      )
    }

    // XP reward
    await User.increment({ xp: 5 }, { where: { id: userId } })

    res.json({
      sessionId:  session.id,
      message:    aiResult.message,
      correction: aiResult.correction,
      vocabulary: aiResult.vocabulary,
      taskStatus: aiResult.taskStatus,
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

    if (!file) {
      res.status(400).json({ error: 'No audio file received' })
      return
    }

    // Transcribe with Whisper
    const transcript = await transcribeAudio(file.buffer)

    // Reuse text handler logic
    req.body.text      = transcript
    req.body.userId    = userId
    req.body.sessionId = sessionId
    return handleMessage(req, res, next)
  } catch (err) {
    next(err)
  }
}
