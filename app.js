// =====*** IMPORTS ***=====
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'

// =====*** INITIALIZE EXPRESS APP ***=====
const app = express()

// =====*** GLOBAL MIDDLEWARES ***=====
app.use(express.json())

// ============================* ROUTES *=============================

// =====*** Auth Routes ***=====
app.use('/api/auth', authRoutes)

// =====*** Product Routes ***=====
app.use('/api/products', productRoutes)

// =====*** Health Check Route ***=====
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is Running 👍',
  })
})

export default app
