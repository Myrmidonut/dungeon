const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("express-jwt")
const graphqlHTTP = require('express-graphql');
require("dotenv").config()

const schema = require("./graphql/schema")
const root = require("./graphql/root")
const port = 3000
const app = express()

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

app.use(bodyParser.json())
app.use(auth)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log("Bad token.")
  }

  next()
});

app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  rootValue: root,
  context: {
    req: req
  },
  graphiql: true
})))

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}/graphql`)
})