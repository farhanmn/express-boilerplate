import users from '#routes/users.js'
import sample from '#routes/sample.js'
import { SC } from '#helper/statuscode.js'

const errorHandler = (req, res) => {
  res.stdJson(SC.NOT_FOUND, null, 'Invalid route')
}
export default (app) => {
  app.use('/users', users), app.use('/sample', sample)
  app.all('*', errorHandler)
}
