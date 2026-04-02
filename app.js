/* =====*** IMPORTS ***===== */
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import errorHandler from './middleware/error.middleware.js'

const app = express()

/* =====*** GLOBAL MIDDLEWARES ***===== */
app.use(cors())
app.use(express.json({ limit: '1mb' }))

/* =====*** ROUTES ***===== */
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

/* =====*** HEALTH CHECK ***===== */
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API is Running 👍' })
})

/* =====*** ERROR HANDLER ***===== */
app.use(errorHandler)

export default app
