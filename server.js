// ======*IMPORT FILE

import app from './app.js'
const PORT = 5000

import connectDB from './config/db.js'

// ======*ENV*======
import dotenv from 'dotenv'
dotenv.config()

// ======*DNS*======

import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

// ======*connect DB*======

connectDB()

app.listen(PORT, () => {
  console.info(`[${new Date().toDateString()}] Server is Running `)
})
