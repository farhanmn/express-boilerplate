import Knex from 'knex'
import chalk from 'chalk'
import configs from './../../knexfile.js'

let knex

const Connect = async () => {
  knex = Knex(configs[process.env.NODE_ENV || 'test'])
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
}

const Close = async () => {
  try {
    console.log('close db connection')
    await knex.destroy()
  } catch (error) {
    console.error(error)
  }
}

export { Connect, Close, knex }
