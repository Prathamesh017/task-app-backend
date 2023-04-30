import TaskService from '../services/taskService.js'
export const addTaskController = async (req, res) => {
  try {
    const { userId, taskNumber, taskName } = req.body

    // Validate user input
    if (!(userId, taskNumber && taskName)) {
      res.status(400).send('All input is required')
    }
    const task = await TaskService.addTask(userId, taskNumber, taskName)

    return res.status(200).json({
      status: 'Success',
      data: {
        _id: task._id,
        userId: task.userId,
        taskNumber: task.taskNumber,
        taskName: task.taskName
      },
      message: 'Task Added Successfully'
    })
  } catch (error) {
    return res.status(400).json({ status: 'Failure', message: error.message })
  }
}

export const getTasksController = async (req, res) => {
  const userId = req.params.id
  console.log(userId)
  try {
    const Alltasks = await TaskService.getAllTasks(userId)

    return res.status(200).json({
      status: 'Success',
      data: {
        Alltasks
      },
      message: 'List of All Tasks'
    })
  } catch (e) {
    return res
      .status(400)
      .json({ status: 'Failure', message: 'Failed to  Add Task' })
  }
}

export const deleteTaskController = async (req, res) => {
  const id = req.params.id
  try {
    await TaskService.deleteTask(id)

    return res.status(200).json({
      status: 'Success',
      message: 'Deleted Task'
    })
  } catch (e) {
    return res
      .status(400)
      .json({ status: 'Failure', message: 'Failed to Delete Task' })
  }
}
