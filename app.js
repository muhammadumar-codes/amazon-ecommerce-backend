// =====*** IMPORTS ***=====
import express from 'express'
import authRoutes from './routes/auth.routes.js'

// =====*** INITIALIZE EXPRESS APP ***=====
const app = express()

// =====*** GLOBAL MIDDLEWARES ***=====
app.use(express.json())

// ============================* ROUTES *=============================

// =====*** Auth Routes ***=====
app.use('/api/auth', authRoutes)

// =====*** Health Check Route ***=====
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is Running 👍',
  })
})

export default app
