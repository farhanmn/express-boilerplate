# Express Boilerplate

An Express Boilerplate with Javascript ES6 (module) style and Knex Query Builder

## Installation

Clone this express-boilerplate with git

```bash
  git clone https://github.com/farhannjb/express-boilerplate-2
  cd express-boilerplate-2
  ## rename .env.development to .env
  ## adjust the value inside as you needed
  yarn install
```

## Folder Structure

```
.
├── /controllers
│ └── authController.js   # sample controller
├── /database
│ └── migrations          # migration folder
├── /helper
│ └── response.js         # default JSON response
├── /middlewares
├── /models               # database models
├── /public               # public folder/file
├── /routes
│ ├── v1                  # version 1 endpoint
│ └── index.js
├── /services
│ └── userService.js      # sample services
├── /tests                # test directory
├── /views
│ └── home.ejs            # sample EJS view
├── env.development       # sample environment variable files
├── .gitignore
├── app.js
├── eslint.config.js      # ESLint configuration
├── jsconfig.json
├── knexfile.js           # knex config
├── package.json
└── README.md
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASS`
`DB_NAME`
`DB_DIALECT`
`DB_DEBUG`

`JWT_SECRET`
`JWT_REFRESH_SECRET`
`JWT_ALGORITHM`
`JWT_EXPIRES_IN`

## Tech

- [expressJS](https://expressjs.com/) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [nodemon](https://nodemon.io/) - Simple monitor script for use during development of a Node.js app
- [Passport](https://passportjs.org/) - Authentication middleware for Node.js
- [JWT](https://jwt.io/) - a compact URL-safe means of representing claims to be transferred between two parties
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [chalk](https://github.com/chalk/chalk#readme) - Terminal string styling done right
- [knex](https://knexjs.org/) - is a "batteries included" SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use
- [Jest](https://jestjs.io) - A delightful JavaScript Testing Framework with a focus on simplicity
- [ESLint](https://eslint.org/) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline

## Script

- `yarn start` - Runs the application using Node.js
- `yarn dev` - Runs the application in development mode with automatic restarts using `nodemon`
- `yarn test` - Run the test
- `yarn lint` - Run linter

## Authors

- [@farhannjb](https://github.com/farhannjb)
