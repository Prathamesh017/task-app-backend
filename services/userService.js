import { UserModel } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const registerUser = async (name, email, password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    })

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )
    // save user token
    user.token = token

    return user
    // return new user
  } catch (err) {
    console.log(err)
  }
}

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw Error("User Doesn't Exist.Please Register")
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )

    // save user token
    user.token = token

    // user
    return user
  } else {
    throw new Error('Incorrect Password')
  }
}

const getAllUsers = async () => {
  try {
    const allUsers = await UserModel.find()
    return allUsers
  } catch (error) {
    console.log(error)
    throw error
  }
}
const UserService = {
  registerUser,
  loginUser,
  getAllUsers
}
export default UserService
