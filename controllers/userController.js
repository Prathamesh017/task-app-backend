import UserService from '../services/userService.js'
import { UserModel } from '../models/userModel.js'
export const registerController = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!(name, email && password)) {
      res.status(400).json({ message: 'All input is required' })
    }

    const oldUser = await UserModel.findOne({ email })

    if (oldUser) {
      return res
        .status(409)
        .json({ message: 'User Already Exist. Please Login' })
    }

    console.log(name, email, password)
    const user = await UserService.registerUser(name, email, password)

    if (user) {
      return res.status(200).json({
        status: 'Success',
        data: user,
        message: 'User Register Successfully'
      })
    } else {
      return res.status(400).json({
        status: 'Fail',
        data: user,
        message: 'Couldnt Create User'
      })
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 'Failure', message: 'Failed To Register:( Try Again' })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const login = await UserService.loginUser(email, password)
    return res.status(200).json({
      status: 'Success',
      data: {
        _id: login._id,
        name: login.name,
        email: login.email,
        token: login.token
      },
      message: 'User Login Successfull'
    })
  } catch (error) {
    return res.status(400).json({ status: 'Failure', message: error.message })
  }
}

export const allUserController = async (req, res) => {
  const allUsers = await UserService.getAllUsers()
  return res.status(200).json({
    status: 'Success',
    data: allUsers,
    message: 'List of all users'
  })
}

export const getGoals = (req, res) => {
  res.status(200).json({ message: 'success' })
}
