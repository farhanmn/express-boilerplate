import app from 'express'
const router = app.Router()

import AuthController from '#controllers/AuthController.js'

router.post('/login-v2', AuthController.signInV2)

export default router
