import app from 'express'
const router = app.Router()

import AuthController from '#controllers/AuthController.js'

router.post('/register', AuthController.signUp)

router.post('/login', AuthController.signIn)

export default router
