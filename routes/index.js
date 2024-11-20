import express from 'express'
import v1 from '#routes/v1/index.js'
import v2 from '#routes/v2/index.js'

const router = express.Router()

router.use('/v1', v1)
router.use('/v2', v2)

export default router
