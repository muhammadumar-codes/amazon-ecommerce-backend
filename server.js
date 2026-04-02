import app from './app.js'
import connectDB from './config/db.config.js'
import { env, validateEnv, isRedisConfigured } from './config/env.config.js'

const startServer = async () => {
  validateEnv()
  await connectDB()

  if (!isRedisConfigured()) {
    console.warn(
      '=====*** Redis is not configured. Cache features will run in no-op mode. ***====='
    )
  }

  app.listen(env.port, () => {
    console.info(
      `[${new Date().toDateString()}] Server is Running on port ${env.port}`
    )
  })
}

startServer().catch((error) => {
  console.error(`=====*** Server Startup Error: ${error.message} ***=====`)
  process.exit(1)
})
