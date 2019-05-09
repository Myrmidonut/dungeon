const gameValues = require("./values")
const gameFunctions = require("./functions")
const player = require("./dummyPlayer")

function game_test() {
  console.log("=============================")

  console.log("player: ", player)
  console.log("=============================")

  gameFunctions.levelUp(player, gameValues.probabilityTables.levelUp)

  console.log("level up: ", player)
  console.log("=============================")

  const monster = gameFunctions.createMonster(
    gameValues.monsterNames,
    gameValues.weaponNames,
    gameFunctions.randomProbability(gameValues.probabilityTables.monster),
    gameValues.monsterEffects,
    gameFunctions.playerStatAverage(player),
    gameValues.monsterRating,
    player
  )

  console.log("monster: ", monster)
  console.log("=============================")

  console.log("encounter:", gameFunctions.encounter(
    player,
    monster,
    gameValues.probabilityTables.levelUp,
    gameValues.playerClassHitChance,
    gameValues.probabilityTables.encounter,
    gameValues.probabilityTables.loot,
    gameValues.probabilityTables.material,
    gameValues.probabilityTables.treasureChest,
    gameValues.playerEffects
  ))

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