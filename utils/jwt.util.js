import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js'

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}
