import Knex from 'knex'
import configs from './../knexfile.js'
import chalk from 'chalk'

const knex = Knex(configs[process.env.NODE_ENV || 'development'])
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

const closeDB = async () => {
  try {
    console.log('close db connection')
    await knex.destroy()
  } catch (error) {
    console.error(error)
  }
}

export { knex, closeDB }
