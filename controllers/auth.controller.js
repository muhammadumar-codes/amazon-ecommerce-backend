/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'

/* ================================* REGISTER USER *============================ */
const register = asyncHandler(async (req, res) => {
  /* =====*** EXTRACT DATA FROM BODY ***===== */
  const { name, email, password, role } = req.body

  /* =====*** VALIDATION: REQUIRED FIELDS ***===== */
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
     - Only logged-in ADMIN can assign ADMIN role
  */
  let userRole = 'USER'

  if (req.user && req.user.role === 'ADMIN') {
    userRole = role === 'ADMIN' ? 'ADMIN' : 'USER'
  }

  /* =====*** CREATE NEW USER ***===== */
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  })

  /* =====*** SUCCESS RESPONSE ***===== */
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
  /* =====*** EXTRACT DATA FROM BODY ***===== */
  const { email, password } = req.body

  /* =====*** VALIDATION: REQUIRED FIELDS ***===== */
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  /* =====*** FIND USER & INCLUDE PASSWORD FIELD ***===== */
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  /* =====*** COMPARE PASSWORDS ***===== */
  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  /* =====*** GENERATE ACCESS TOKEN (JWT) ***===== */
  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  })

  /* =====*** SUCCESS RESPONSE ***===== */
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
