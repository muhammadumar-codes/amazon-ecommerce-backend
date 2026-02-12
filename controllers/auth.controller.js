// =====*** IMPORTS ***=====
import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'

// ================================* REGISTER USER *============================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // =====*** Check required fields ***=====
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // =====*** Check if user already exists ***=====
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      })
    }

    // =====*** Hash password before saving ***=====
    const hashedPassword = await hashPassword(password)

    // =====*** Create new user in DB ***=====
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // =====*** Response ***=====
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('=====*** REGISTER ERROR ***=====', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// ================================* LOGIN USER *===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // =====*** Check required fields ***=====
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    // =====*** Find user in DB & select password ***=====
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // =====*** Compare password ***=====
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // =====*** Generate JWT token ***=====
    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    })

    // =====*** Response ***=====
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error('=====*** LOGIN ERROR ***=====', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

export default {
  register,
  login,
}
