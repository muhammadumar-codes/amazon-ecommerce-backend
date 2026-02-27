/* =====*** IMPORTS ***===== */

import asyncHandler from 'express-async-handler'

/* =====*** ADMIN MIDDLEWARE ***===== */
const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403) // Forbidden
    throw new Error('Admin access only')
  }
})

export default adminMiddleware
