import { Router } from 'express'
import { login } from '../controllers/authControllers'


const router = Router()
router.route('/').post(login)

export default router