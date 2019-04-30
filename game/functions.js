function randomProbability(probabilityTable) {
	let i
  let sum = 0
  const random = Math.random()

  for (i in probabilityTable) {
    sum += probabilityTable[i]

    if (random <= sum) return i
  }
}

function dodge(max) {
  return Math.floor(Math.random() * (max * 10 + 1))
}

function getClassStat(player) {
  if (player.class === "barbarian") return "strength"
  else if (player.class === "thief") return "agility"
  else return "stamina"
}

function levelUp(player, probability) {
  for (let stat in player.stats) {
    if (stat === getClassStat(player) && Math.random() >= probability.classStat) {
      player.stats[stat] += 1
    } else if (stat !== getClassStat(player) && Math.random() >= probability.stat) {
      player.stats[stat] += 1
    }
  }
}

function playerStatAverage(player) {
  let average = 0

  for (let stat in player.stats) {
    average += player.stats[stat]
  }

  return average / 4
}

function monsterName(names) {
  return names[Math.floor(Math.random() * names.length)]
}

function monsterRandomAdjectives(adjectives) {
  let adjectivesCopy = adjectives.slice()
  let amount = Math.floor(Math.random() * 4)
  let result = []

  for (let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * adjectivesCopy.length)
    const value = adjectivesCopy[random]

    adjectivesCopy.splice(random, 1)

    result.push(value.name)
  }

  return result
}

function monsterStat(type, playerStatAverage, monsterRating) {
  let rating

  if (type === "normal") rating = monsterRating.normal
  else rating = monsterRating.elite

  let max = rating * playerStatAverage
  let min = (rating - 0.25) * playerStatAverage

  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createMonster(names, type, adjectives, playerStatAverage, monsterRating) {
  return {
    name: monsterName(names),
    type: type,
    adjectives: monsterRandomAdjectives(adjectives),
    stats: {
      strength: monsterStat(type, playerStatAverage, monsterRating),
      stamina: monsterStat(type, playerStatAverage, monsterRating),
      endurance: monsterStat(type, playerStatAverage, monsterRating),
      agility: monsterStat(type, playerStatAverage, monsterRating)
    }
  }
}

function createLoot(player, lootProbability, materialProbability) {
  let loot = lootProbability

  if (loot === "gear") {
    loot += ` quality ${perception(player)}`
  } else if (loot === "material") {
    loot = createMaterial(player, materialProbability)
  } else if (loot === "gold") {
    loot = `${perception(player)} gold`
  }

  return loot
}

function createMaterial(player, material) {
  if (material === "empty") return "empty"
  else return `${player.tools[material].value * perception(player)} ${material}`
}

function perception(player) {
  return player.stats.perception + player.toy
}

function craftRecipe(player, type, recipes) {
  if (player.recipes.indexOf(type) !== -1) {
    let hasMaterial = true

    for (let material in recipes[type].materials) {
      if (player.materials[material] < recipes[type].value) {
        hasMaterial = false
      }
    }

    if (hasMaterial) {
      for (let material in recipes[type].materials) {
        player.materials[material] -= recipes[type].value
      }

      player[recipes[type]["type"]][type].amount += (1 + perception(player))

      return "crafted"
    } else return "not enough materials"
  } else return "unknown recipe"
}

function learnRecipe(player, recipe) {
  if (player.recipes.indexOf(recipe) === -1) {
    player.recipes.push(recipe)
  }
}

function fight() {

}

/*
fight
  strength vs stamina

  weapon hit
    if class weapon
      75%
    50%

  dodge
    0% - 50%

  weapon damage
    left
      if crit
        damage x 2
      damage

    if right
      if crit
        damage x 2
      damage

    damage = left + right

  weapon effect
    if hit
      chance to apply effect

  health
    health = health + armor - damage
*/

module.exports = {
  craftRecipe,
  learnRecipe,
  createLoot,
  createMaterial,
  createMonster,
  playerStatAverage,
  randomProbability,
  dodge,
  levelUp
}