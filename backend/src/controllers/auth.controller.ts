import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import { v4 as uuidv4 } from 'uuid'

export async function loginOrRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, level = 'A1', goal = 'Daily Conversation' } = req.body

    if (!name && !email) {
      res.status(400).json({ error: 'Name or email is required' })
      return
    }

    let user: User | null = null

    if (email?.trim()) {
      user = await User.findOne({ where: { email: email.trim().toLowerCase() } })
    }

    if (!user && name?.trim()) {
      user = await User.findOne({ where: { name: name.trim() } })
    }

    if (!user) {
      user = await User.create({
        id: uuidv4(),
        name: name?.trim() || 'Learner',
        email: email?.trim().toLowerCase() || undefined,
        level: level || 'A1',
        goal: goal || 'Daily Conversation',
        xp: 10,
        streak: 1,
        lastSeen: new Date(),
      })
    } else {
      // Update last seen
      await user.update({ lastSeen: new Date() })
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        goal: user.goal,
        xp: user.xp,
        streak: user.streak,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json({ user })
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name, level, goal } = req.body

    const user = await User.findByPk(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    await user.update({
      ...(name ? { name } : {}),
      ...(level ? { level } : {}),
      ...(goal ? { goal } : {}),
    })

    res.json({ user })
  } catch (err) {
    next(err)
  }
}

