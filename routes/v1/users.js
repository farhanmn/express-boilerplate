import app from 'express'
const router = app.Router()

import { useraccess } from '#middlewares/verify.js'
import AuthController from '#controllers/AuthController.js'

router.post('/register', AuthController.signUp)

router.post('/login', AuthController.signIn)

useraccess(router)

router.get('/profile', AuthController.getProfile)

router.put('/profile', AuthController.updateProfile)

export default router
