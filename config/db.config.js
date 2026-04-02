// =====*** Connect to MongoDB ***=====
import mongoose from 'mongoose'
import { env } from './env.config.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri)

    console.log(
      `=====*** MongoDB Connected Successfully  ${conn.connection.host} ***=====`
    )

    return conn
  } catch (error) {
    console.error(`=====*** MongoDB Connection Error: ${error.message} ***=====`)
    throw error
  }
}

export default connectDB
