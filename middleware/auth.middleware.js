import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, token missing')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
    req.user = user
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Token is invalid')
  }
})

export default authMiddleware
