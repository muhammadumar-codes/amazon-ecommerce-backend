/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'

/* ================================* REGISTER USER *============================ */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body

  if (!name || !email || !password || !confirmPassword) {
    res.status(400)
    throw new Error('All fields are required')
  }

  if (password !== confirmPassword) {
    res.status(400)
    throw new Error('Passwords do not match')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(409)
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(password)

  // ===== ROLE LOGIC =====
  let userRole = 'USER' 

  // If someone is logged in AND is ADMIN → allow setting role
  if (req.user && req.user.role === 'ADMIN') {
    userRole = role === 'ADMIN' ? 'ADMIN' : 'USER'
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  })

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

/* ================================* LOGIN USER *=============================== */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // =====*** Check required fields ***=====
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  // =====*** Find user in DB & select password ***=====
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  // =====*** Compare password ***=====
  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid credentials')
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
})

/* =====*** EXPORT CONTROLLER ***===== */
export default {
  register,
  login,
}