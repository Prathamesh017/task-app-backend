import express from 'express'
import dotenv from 'dotenv'
import dbconnect from './config/db.js'
import cors from 'cors'
import usersRouter from './routes/userRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import bodyParser from 'body-parser'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
dotenv.config()

await dbconnect()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.get("/",(req,res)=>{
  res.send("app is running");
})
app.use('/api/v1/user', usersRouter)
app.use('/api/v1/task', taskRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
