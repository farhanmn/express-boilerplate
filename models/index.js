import Knex from 'knex'
import enVariables from '../config/index.js'

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
    min: 0,
    max: 7,
  },
})

export default knex
