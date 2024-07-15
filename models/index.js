import Knex from 'knex'
import configs from './../knexfile.js'
import chalk from 'chalk'

const knex = Knex(configs[process.env.NODE_ENV || 'development'])
const dialect = process.env.DB_DIALECT || 'pg'

knex
  .raw('SELECT version() as version')
  .then(() => {
    console.log(`app:database ${dialect} connection with knex success!`)
  })
  .catch((e) => {
    console.log(
      chalk.bgRed(`app:database ${dialect} connection with knex error:` + e)
    )
  })

export default knex
