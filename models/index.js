import Knex from 'knex'
import config from './../knexfile.js'
import chalk from 'chalk'

const knex = Knex(config)
/**
 * Connect to the database using knex.
 * @async
 * @function Connect
 * @returns {Promise<void>}
 */
const Connect = async () => {
  try {
    const dialect = process.env.DB_DIALECT || 'pg'
    await knex
      .raw('SELECT version() as version')
      .then((res) => {
        console.log(`app:database ${dialect} connection with knex success!`)
        console.log(`app:database ${dialect} version:`, res.rows[0].version)
      })
      .catch((e) => {
        console.log(
          chalk.bgRed(`app:database ${dialect} connection with knex error:` + e)
        )
        process.exit(1)
      })
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

/**
 * Close the connection to the database using knex.
 * @async
 * @function Close
 * @returns {Promise<void>}
 */
const Close = async () => {
  try {
    console.log('close db connection')
    await knex.destroy()
  } catch (error) {
    console.error(error)
  }
}

export { knex, Connect, Close }
