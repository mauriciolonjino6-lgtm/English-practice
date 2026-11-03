import { Router } from 'express'
import multer from 'multer'
import { handleMessage, handleAudio } from '../controllers/chat.controller'

const router: Router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

router.post('/message', handleMessage)
router.post('/audio',   upload.single('audio'), handleAudio)

export default router
