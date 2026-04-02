/* =====*** IMPORTS ***===== */
import express from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import adminMiddleware from '../middleware/admin.middleware.js'
import validate from '../middleware/validate.middleware.js'
import { registerSchema, loginSchema } from '../validations/auth.validation.js'

const router = express.Router()

/* ================================* PUBLIC ROUTES *=============================== */
router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)

/* ================================* ADMIN CREATE USER *=============================== */
router.post(
  '/admin-create',
  authMiddleware,
  adminMiddleware,
  validate(registerSchema),
  authController.register
)

export default router
