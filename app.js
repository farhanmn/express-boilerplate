import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import { config } from 'dotenv'
config()

import { fileURLToPath } from 'url'
import route from '#routes/index.js'

// database
import knex from '#models/index.js'

import logger from '#helper/logger.js'
import standardFormat from '#middlewares/stdJson.js'

import { limiter } from '#helper/security.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(compression())
app.use(helmet())
app.use(limiter)
app.use(standardFormat)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', route)

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const gracefulShutdown = (signal) => {
  console.log(
    `Received signal ${signal} to terminate. Shutting down gracefully...`
  )
  server.close(async () => {
    console.log('Closed out remaining connections.')
    await knex.destroy()
    console.log('app:database connection closed!')
    process.exit(0)
  })

  // If after 10 seconds server hasn't finished, force shutdown
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    )
    process.exit(1)
  }, 10000)
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
