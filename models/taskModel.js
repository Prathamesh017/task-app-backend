import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId is require']
  },
  taskNumber: {
    type: String,
    required: [true, 'taskNumber is required']
  },
  taskName: {
    type: String,
    required: [true, 'taskName is required']
  }
})

export const TaskModel = mongoose.model('TaskModel', TaskSchema)
