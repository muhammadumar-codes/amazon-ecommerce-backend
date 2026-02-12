// =====*** IMPORTS ***=====
import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import validate from '../middleware/validate.middleware.js'
import { registerSchema, loginSchema } from '../validations/auth.validation.js'

const router = Router()

// ================================* AUTH ROUTES *=============================

// =====*** Register User Route ***=====
router.post('/register', validate(registerSchema), authController.register)

// =====*** Login User Route ***=====
router.post('/login', validate(loginSchema), authController.login)

export default router
