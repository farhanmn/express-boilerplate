import { config } from 'dotenv'
config()

const dialect = process.env.DB_DIALECT || 'pg'
const with_debug =
  !!process.env.DB_DEBUG &&
  ['true', '1'].includes(process.env.DB_DEBUG.toLowerCase())

const validateConfig = (config) => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing environment variable for ${key}`)
    }
  }
}

const connection = {
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  development: {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    database: process.env.DB_DEV_NAME,
  },
  test: {
    host: process.env.DB_TEST_HOST,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    database: process.env.DB_TEST_NAME,
  },
}

validateConfig(connection[process.env.NODE_ENV || 'development'])

export default {
  client: dialect,
  debug: with_debug,
  connection: connection[process.env.NODE_ENV || 'development'],
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './database/seeds/dev',
  },
}
