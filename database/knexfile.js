import { config } from 'dotenv'
config()

const environments = ['development', 'staging', 'production']
const dialect = process.env.DB_DIALECT || 'pg'
const with_debug =
  process.env.DB_DEBUG.toLowerCase() === 'true' ||
  process.env.DB_DEBUG.toLowerCase() === '1'
    ? true
    : false

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const commonConfig = {
  client: dialect,
  debug: with_debug,
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations',
  },
}
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default Object.fromEntries(
  environments.map((env) => [env, commonConfig])
)
