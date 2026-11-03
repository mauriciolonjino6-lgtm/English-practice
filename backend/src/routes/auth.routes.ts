import { Router } from 'express'
import { loginOrRegister, getUser, updateUser } from '../controllers/auth.controller'

const router: Router = Router()

router.post('/login', loginOrRegister)
router.post('/register', loginOrRegister)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)

export default router
