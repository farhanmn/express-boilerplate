import Knex from 'knex'
import config from './../../knexfile.js'
import chalk from 'chalk'

const knex = Knex(config)

const Connect = async () => {
  try {
    const dialect = process.env.DB_DIALECT || 'pg'
    await knex
      .raw('SELECT version() as version')
      .then(() => {
        console.log(`app:database ${dialect} connection with knex success!`)
      })
      .catch((e) => {
        console.log(
          chalk.bgRed(`app:database ${dialect} connection with knex error:` + e)
        )
      })
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

const Close = async () => {
  try {
    console.log('close db connection')
    await knex.destroy()
  } catch (error) {
    console.error(error)
  }
}

export { knex, Connect, Close }
