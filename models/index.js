import Knex from 'knex'
import enVariables from '#config/index.js'

const config = enVariables

const knex = Knex({
  client: config.dialect || 'mysql',
  connection: {
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    debug: true,
  },
  pool: {
    min: 2,
    max: 10,
  },
  log: {
    debug(message) {
      console.log(message)
    },
  },
})

knex
  .raw('SELECT version() as version')
  .then((res) => {
    console.log(`app:database ${config.dialect} connection with knex success!`)
  })
  .catch((e) => {
    console.error(
      `app:database ${config.dialect} connection with knex error : \n` + e
    )
  })

export default knex
