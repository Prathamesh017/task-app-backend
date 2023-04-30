import { Router } from 'express'
import {
  registerController,
  loginController,
  allUserController,
  getGoals
} from '../controllers/userController.js'
import verifyToken from '../middleware/auth.js'
const usersRouter = Router()

usersRouter.get('/all', allUserController)
usersRouter.post('/register', registerController)
usersRouter.post('/login', loginController)
usersRouter.get('/me', verifyToken, getGoals)

export default usersRouter
