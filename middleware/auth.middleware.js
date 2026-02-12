// =====*** IMPORTS ***=====
import jwt from 'jsonwebtoken'

// ============================* AUTH MIDDLEWARE *=============================
const authMiddleware = (req, res, next) => {
  try {
    // =====*** Get Authorization Header ***=====
    const authHeader = req.headers.authorization

    // =====*** Check if token exists & starts with Bearer ***=====
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided',
      })
    }

    // =====*** Extract Token ***=====
    const token = authHeader.split(' ')[1]

    // =====*** Verify Token ***=====
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // =====*** Attach decoded user data to request ***=====
    req.user = decoded

    next()
  } catch (error) {
    console.error('=====*** AUTH MIDDLEWARE ERROR ***=====', error)

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

export default authMiddleware
