import { Router } from 'express'
import { getDue, postReview } from '../controllers/srs.controller'

const router: Router = Router()
router.get('/due/:userId',       getDue)
router.post('/review/:cardId',   postReview)

export default router
