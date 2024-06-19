import dotenv from 'dotenv'
dotenv.config()

const username = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dialect = process.env.DB_DIALECT
const node_env = process.env.NODE_ENV
const use_env_variable = process.env.USE_ENV_VARIABLE || false

const logVal = process.env.DB_LOGGING
const logging = logVal === 'true' || logVal === '1' ? true : false

const config = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging,
    use_env_variable,
  },
  testing: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging,
    use_env_variable,
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging,
    use_env_variable,
  },
}
export default config[node_env]
