import { Router } from 'express'
import { getBritishAudio } from '../controllers/tts.controller'

const router: Router = Router()

router.get('/', getBritishAudio)

export default router
