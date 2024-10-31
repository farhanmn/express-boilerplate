/**
 * Sample route with middleware for user verification
 */

import app from 'express'
const router = app.Router()

import { StatusCodes as SC, ReasonPhrases } from 'http-status-codes'

import { useraccess } from '#middlewares/verify.js'

// sample route with view
router.get('/home', (req, res) => {
  res.render('home')
})

useraccess(router)

router.get('/', (req, res) => {
  return res.status(SC.OK).json({
    status: ReasonPhrases.OK,
  })
})

export default router
