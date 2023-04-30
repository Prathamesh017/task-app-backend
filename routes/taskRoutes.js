import { Router } from 'express'
import {
  addTaskController,
  deleteTaskController,
  getTasksController
} from '../controllers/taskController.js'
import verifyToken from '../middleware/auth.js'

const taskRouter = Router()
taskRouter.get('/:id', verifyToken, getTasksController)
taskRouter.post('/', verifyToken, addTaskController)
taskRouter.delete('/:id', verifyToken, deleteTaskController)

export default taskRouter
