// ======*IMPORT FILES *======
import express from 'express'
const app = express()
const PORT = 5000
import connectDB from './config/db.js'

// ======*ENV*======
import dotenv from 'dotenv'
dotenv.config()

// ======*DNS*======

import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

app.use(express.json())

app.get('/', (req, res) => {
  res.send('wellcome the home page')
})

// ======*connect DB*======

connectDB()

app.listen(PORT, () => {
  console.log('server is running ')
})
