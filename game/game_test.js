const gameValues = require("./values")
const gameFunctions = require("./functions")
const player = require("./dummyPlayer")

function game_test() {
  console.log("=============================")
  console.log("player: ", player)
  console.log("=============================")

  //gameFunctions.levelUp(player, gameValues)

  //console.log("level up: ", player)
  //console.log("=============================")

  const monster = gameFunctions.createMonster(
    player,
    gameValues
  )

  console.log("encounter:", gameFunctions.encounter(
    player,
    monster,
    gameValues
  ))

  /*console.log("=============================")
  console.log("scavenge: ", gameFunctions.scavenge(
    player,
    gameValues
  ))*/

  /*console.log("=============================")
  console.log(player.food)
  console.log("craft: ", gameFunctions.craft(
    player,
    "food",
    gameValues
  ))
  console.log(player.food)*/

  /*console.log("=============================")
  console.log(player.health)
  console.log("bandage: ", gameFunctions.useBandage(
    player,
    gameValues
  ))
  console.log(player.health)*/

  /*console.log("=============================")
  console.log(player.effects)
  console.log("potion: ", gameFunctions.usePotion(
    player,
    gameValues
  ))
  console.log(player.effects)*/

  /*console.log("=============================")
  console.log(player.health)
  console.log("potion: ", gameFunctions.useFood(
    player
  ))
  console.log(player.health)*/

  /*console.log("create room: ", gameFunctions.randomProbability(gameValues.probabilityTables.encounter))
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

  gameFunctions.fight(player, monster, gameValues.playerClassHitChance)
  */
}

module.exports = game_test