/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { hashPassword, comparePassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'

/* ================================* REGISTER USER *=============================== */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  /* =====*** CHECK REQUIRED FIELDS ***===== */
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are required')
  }

  /* =====*** CHECK IF USER ALREADY EXISTS ***===== */
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(409)
    throw new Error('User already exists')
  }

  /* =====*** HASH PASSWORD BEFORE SAVING ***===== */
  const hashedPassword = await hashPassword(password)

  /* =====*** ROLE LOGIC ***=====
     - Default role is USER
     - First user ever → auto ADMIN
     - Only logged-in ADMIN can assign ADMIN
  */ x
  let userRole = 'USER'
  const totalUsers = await User.countDocuments()

  if (totalUsers === 0) {
    userRole = 'ADMIN'
  } else if (req.user && req.user.role === 'ADMIN') {
    userRole = role === 'ADMIN' ? 'ADMIN' : 'USER'
  }

  /* =====*** CREATE USER IN DB ***===== */
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  })

  /* =====*** RESPONSE ***===== */
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
})

/* ================================* LOGIN USER *=============================== */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email, isActive: true }).select('+password')
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  })

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
