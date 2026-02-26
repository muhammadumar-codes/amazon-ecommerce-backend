// =====*** DATABASE CONNECTION ***=====
import mongoose from 'mongoose'

// =====*** Connect to MongoDB ***=====
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin123@cluster0.6rxrmfd.mongodb.net/?appName=Cluster0'
    )
    console.log('=====*** MongoDB Connected Successfully ***=====')
  } catch (error) {
    console.error('=====*** MongoDB Connection Error ***=====', error)
    process.exit(1)
  }
}

export default connectDB
