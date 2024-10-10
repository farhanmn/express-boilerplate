import morgan from 'morgan'
import chalk from 'chalk'
import moment from 'moment'

export default morgan((tokens, req, res) => {
  let body = req.body
  if (body.password) {
    body = { ...body, password: '******' }
  }
  body = JSON.stringify(body)

  return [
    chalk.white(
      '[' +
        moment(tokens['date'](req, res)).format('ddd, DD MMM YYYY HH:mm:ss') +
        ']'
    ),
    chalk.green.bold(tokens.method(req, res)),
    chalk.green(tokens.url(req, res)),
    chalk.yellow(body),
    chalk.green(tokens.status(req, res)),
    chalk.white('| ' + tokens['response-time'](req, res) + ' ms'),
  ].join(' ')
})
