/**
 * Sample route with middleware for user verification
 */

import app from 'express'
const router = app.Router()

import { useraccess } from '#middlewares/verify.js'
import { SC } from '#helper/statuscode.js'

// sample route with view
router.get('/home', (req, res) => {
  res.render('home')
})

useraccess(router)

router.get('/', (req, res) => {
  return res.stdJson(SC.OK, req.access, 'Welcome')
})

export default router
