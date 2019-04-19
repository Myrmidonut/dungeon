require("dotenv").config()

const dbDev = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host:     process.env.DB_HOST,
  dialect:  'mysql'
}

const dbProd = {
  dbUrl: process.env.DATABASE_URL,
  dialect: "postgres"
}

module.exports = {
  development: dbDev,
  production:  dbProd
}