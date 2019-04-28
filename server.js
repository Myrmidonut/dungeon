const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const jwt = require("express-jwt")
const graphqlHTTP = require('express-graphql');
const path = require("path")
require("dotenv").config()

const schema = require("./graphql/schema")
const root = require("./graphql/root")

const gameValues = require("./game/values")
const gameFunctions = require("./game/functions")

const player = {
  class: "thief",
  stats: {
    strength: 1,
    agility: 1,
    stamina: 1,
    endurance: 1
  }
}

gameFunctions.levelUp(player, gameValues.probabilityTables.levelUp)

console.log(player)

const port = process.env.PORT || 4000;
const app = express()
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(auth)

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: {
    req: req,
    res: res
  }
})))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}/graphql`)
})