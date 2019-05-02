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
const player = require("./game/dummyPlayer")

console.log("=============================")

console.log("player: ", player)
console.log("=============================")

gameFunctions.levelUp(player, gameValues.probabilityTables.levelUp)

console.log("level up: ", player)
console.log("=============================")

console.log("monster: ", gameFunctions.createMonster(
  gameValues.monsterNames,
  gameFunctions.randomProbability(gameValues.probabilityTables.monster),
  gameValues.adjectives,
  gameFunctions.playerStatAverage(player),
  gameValues.monsterRating
))
console.log("=============================")

console.log("create room: ", gameFunctions.randomProbability(gameValues.probabilityTables.encounter))
console.log("=============================")

console.log("materials loot: ", gameFunctions.createMaterial(
  player,
  gameFunctions.randomProbability(gameValues.probabilityTables.material)
))
console.log("=============================")

console.log("monster loot: ", gameFunctions.createLoot(
  player,
  gameFunctions.randomProbability(gameValues.probabilityTables.loot),
  gameFunctions.randomProbability(gameValues.probabilityTables.material)
))
console.log("=============================")

console.log(player.materials)
console.log(player.potions)

console.log(gameFunctions.craftRecipe(
  player,
  "basic potion",
  gameValues.recipes
))

console.log(player.materials)
console.log(player.potions)

console.log(gameFunctions.craftRecipe(
  player,
  "basic potion",
  gameValues.recipes
))

console.log("=============================")

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