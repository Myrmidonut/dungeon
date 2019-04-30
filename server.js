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
    strength: 5,
    stamina: 8,
    endurance: 9,
    agility: 15
  },
  weapons: {
    left: 6,
    right: 4
  },
  armor: {
    helmet: 2,
    chest: 5,
    pants: 2,
    boots: 1,
    gloves: 3
  },
  toy: 3,
  tools: {
    cloth: 2,
    bones: 5,
    organs: 7,
    metal: 1
  }
}

console.log("player: ", player)

gameFunctions.levelUp(player, gameValues.probabilityTables.levelUp)

console.log("level up: ", player)

console.log("monster: ", gameFunctions.createMonster(
  gameValues.monsterNames,
  gameFunctions.randomProbability(gameValues.probabilityTables.monster),
  gameValues.adjectives,
  gameFunctions.playerStatAverage(player),
  gameValues.monsterRating
))

console.log("create room: ", gameFunctions.randomProbability(gameValues.probabilityTables.encounter))

console.log("materials loot: ", gameFunctions.createMaterial(
  player,
  gameFunctions.randomProbability(gameValues.probabilityTables.material)
))

console.log("monster loot: ", gameFunctions.createLoot(
  player,
  gameFunctions.randomProbability(gameValues.probabilityTables.loot),
  gameFunctions.randomProbability(gameValues.probabilityTables.material)
))

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