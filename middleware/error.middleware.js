/* ================================* GLOBAL ERROR HANDLER *=============================== */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)
  let message = err.message

  /* =====*** MONGODB INVALID OBJECT ID ***===== */
  if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  /* =====*** MONGODB DUPLICATE KEY ERROR ***===== */
  if (err.code === 11000) {
    statusCode = 400
    message = 'Duplicate field value entered'
  }

  /* =====*** JWT ERROR ***===== */
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  /* =====*** JWT EXPIRED ***===== */
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  }

  /* =====*** RESPONSE ***===== */
  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default errorHandler
