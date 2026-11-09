import { Router } from 'express'
import chatRoutes from './chat.routes'
import srsRoutes  from './srs.routes'
import authRoutes from './auth.routes'
import ttsRoutes  from './tts.routes'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/chat', chatRoutes)
router.use('/srs',  srsRoutes)
router.use('/tts',  ttsRoutes)

export default router
