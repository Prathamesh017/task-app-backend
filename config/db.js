import mongoose from 'mongoose'
async function dbconnect () {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose
    .connect(process.env.url, connectionParams)
    .then(() => {
      console.log('Connected to database ')
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`)
    })
}

export default dbconnect
