require("dotenv").config()

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host:     process.env.DB_HOST,
  dialect:  'mysql'
}

const production = {
  username: process.env.DB_USERNAME_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_NAME_PROD,
  host:     process.env.DB_HOST_PROD,
  dialect:  'postgres'
}

module.exports = {
  development: development,
  production:  production
}