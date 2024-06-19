import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import route from '#routes/index.js'
dotenv.config()

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

route(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is now running at port:', port)
})
