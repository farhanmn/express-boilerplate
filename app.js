import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import { config } from 'dotenv'
config()

import { fileURLToPath } from 'url'
import route from '#routes/index.js'

import { Connect as connectDB, Close as closeDB } from '#models/index.js'

import logger from '#helper/logger.js'

import { limiter } from '#helper/security.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(compression())
app.use(helmet())
app.use(limiter)

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', route)

const port = process.env.PORT || 3000

let server
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await connectDB()
    }

    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

const shutDown = (signal) => {
  if (process.env.NODE_ENV === 'test') {
    server.close()
  } else {
    console.log(
      `Received signal ${signal} to terminate. Shutting down gracefully...`
    )
    server.close(async () => {
      console.log('Closed out remaining connections.')
      await closeDB()
      process.exit(0)
    })

    setTimeout(() => {
      console.error(
        'Could not close connections in time, forcefully shutting down'
      )
      process.exit(1)
    }, 10000)
  }
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

startServer()

export { app, shutDown }
