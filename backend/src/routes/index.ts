import { Router } from 'express'
import chatRoutes from './chat.routes'
import srsRoutes  from './srs.routes'

const router: Router = Router()
router.use('/chat', chatRoutes)
router.use('/srs',  srsRoutes)
export default router
