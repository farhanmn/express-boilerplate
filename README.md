# Express Boilerplate

An Express Boilerplate with Javascript ES6 style and Knex

## Installation

Clone this express-boilerplate with git

```bash
  git clone https://github.com/farhannjb/express-boilerplate
  cd express-boilerplate
  ## rename .env.development to .env
  ## adjust the value inside as you needed
  yarn install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKEN_SECRET`
`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASS`
`DB_NAME`
`DB_DIALECT`
`JWT_SECRET`
`JWT_REFRESH_SECRET`
`JWT_ALGORITHM`
`JWT_EXPIRES_IN`

## Tech

- [expressJS](https://expressjs.com/) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [nodemon](https://nodemon.io/) - Simple monitor script for use during development of a Node.js app
- [JWT](https://jwt.io/) - a compact URL-safe means of representing claims to be transferred between two parties
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [chalk](https://github.com/chalk/chalk#readme) - Terminal string styling done right
- [knex](https://knexjs.org/) - is a "batteries included" SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

## Script

- `yarn start` - Runs the application using Node.js
- `yarn run dev` - Runs the application in development mode with automatic restarts using `nodemon`
<!-- - `yarn run typeorm:generate`[^1] - Generates a new migration file based on changes to the entities
- `yarn run typeorm:migrate` - Applies pending migrations to the database -->

## Authors

- [@farhannjb](https://github.com/farhannjb)

<!-- [^1]: If you have generated the migration script, please make sure to change it to ES6 style, such as changing `module.exports` to `export` and remove all unnucessary imported data. -->
