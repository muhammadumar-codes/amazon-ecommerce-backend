/* ================================* ADMIN MIDDLEWARE *=============================== */
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next()
  } else {
    res.status(403)
    throw new Error('Access denied, admin only')
  }
}

export default adminMiddleware
