import app from 'express'
const router = app.Router()

import AuthController from '#controllers/AuthController.js'

import { auth } from '#middlewares/auth.js'

// running passport configuration
auth()

router.post('/login-v2', AuthController.signInV2)

export default router
