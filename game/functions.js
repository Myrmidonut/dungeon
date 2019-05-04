function randomProbability(probabilityTable) {
	let i
  let sum = 0
  const random = Math.random()

  for (i in probabilityTable) {
    sum += probabilityTable[i]

    if (random <= sum) return i
  }
}

// Math.floor(Math.random() * (max - min + 1)) + min;

function monsterDodge() {
  return 0.2
}

function playerDodge(player) {
  return Math.log2(player.stats.agility) / 10
}

function randomRoll(dodge) {
  const random = Math.round(Math.random() * 100) / 100

  if (random > dodge) return false
  else return true
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

function playerDamageAverage(player) {
  return (
    (player.weapons.left.damage.minimum 
    + player.weapons.left.damage.maximum
    + player.weapons.right.damage.minimum
    + player.weapons.right.damage.maximum) / 4
  )
}

function monsterWeapons(player) {
  const amount = Math.floor(Math.random() * 2 + 1)

  if (amount === 1) {
    return {
      left: {
        damage: {
          minimum: playerDamageAverage(player) * 0.666,
          maximum: playerDamageAverage(player) * 1.333,
        },
        critChance: 0.2
      },
      right: {
        damage: {
          minimum: 0,
          maximum: 0,
        },
        critChance: 0
      }
    }
  } else {
    return {
      left: {
        damage: {
          minimum: playerDamageAverage(player) * 0.666 / 2,
          maximum: playerDamageAverage(player) * 1.333 / 2,
        },
        critChance: 0.2
      },
      right: {
        damage: {
          minimum: playerDamageAverage(player) * 0.666 / 2,
          maximum: playerDamageAverage(player) * 1.333 / 2,
        },
        critChance: 0.2
      }
    }
  }
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

function createMonster(names, type, adjectives, playerStatAverage, monsterRating, player) {
  return {
    name: monsterName(names),
    type: type,
    adjectives: monsterRandomAdjectives(adjectives),
    stats: {
      strength: monsterStat(type, playerStatAverage, monsterRating),
      stamina: monsterStat(type, playerStatAverage, monsterRating),
      endurance: monsterStat(type, playerStatAverage, monsterRating),
      agility: monsterStat(type, playerStatAverage, monsterRating)
    },
    weapons: monsterWeapons(player),
    dodge: monsterDodge(),
    armor: Math.round(armor(player) * monsterRating[type]),
    hitChance: monsterRating[type]
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
  else return `${player.tools[material].value * Math.ceil(perception(player) / 10)} ${material}`
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

      player[recipes[type]["type"]][type].amount += (1 + Math.ceil(perception(player) / 10))

      return "crafted"
    } else return "not enough materials"
  } else return "unknown recipe"
}

function learnRecipe(player, recipe) {
  if (player.recipes.indexOf(recipe) === -1) {
    player.recipes.push(recipe)
  }
}

function hitChance(player, hand, hitChance) {
  if (player.class === player.weapons[hand].class) {
    return hitChance.class
  } else {
    return hitChance.nonClass
  }
}

function critChance(player, hand) {
  if (player.class === player.weapons[hand].class) {
    return player.weapons[hand].critChance
  } else {
    return 0
  }
}

function damage(player, hand) {
  const min = player.weapons[hand].damage.minimum
  const max = player.weapons[hand].damage.maximum

  if (Math.random() >= critChance(player, hand)) {
    return {
      crit: false,
      value: Math.floor(Math.random() * (max - min + 1)) + min
    }
  } else {
    return {
      crit: true,
      value: 2 * (Math.floor(Math.random() * (max - min + 1)) + min)
    }
  }
}

function armor(player) {
  const armor = Object.values(player.armor).reduce((total, e) => total + e)
  
  return armor
}

function fight(player, monster, playerClassHitChance) {
  const first = "player"
  let attacker = first

  // player attacks first
  // go throuch attack round
  // monster attacks
  // go through attack round
  // repeat until dead

  let currentPlayer = {
    strength: player.stats.strength,
    stamina: player.stats.stamina,
    hit: {
      left: randomRoll(hitChance(player, "left", playerClassHitChance)),
      right: randomRoll(hitChance(player, "right", playerClassHitChance))
    },
    crit: {
      left: randomRoll(critChance(player, "left")),
      right: randomRoll(critChance(player, "right"))
    },
    health: player.stats.endurance * 10,
    armor: armor(player),
    dodge: randomRoll(playerDodge(player)),
    damage: {
      left: damage(player, "left", critChance(player, "left")),
      right: damage(player, "right", critChance(player, "right")),
    }
  }

  let currentMonster = {
    strength: monster.stats.strength,
    stamina: monster.stats.stamina,
    hit: {
      left: randomRoll(monster.hitChance),
      right: randomRoll(monster.hitChance)
    },
    crit: {
      left: randomRoll(monster.critChance),
      right: randomRoll(monster.critChance)
    },
    health: monster.stats.endurance * 10,
    armor: monster.armor,
    dodge: randomRoll(monsterDodge()),
    damage: {
      left: damage(monster, "left", critChance(monster, "left")),
      right: damage(monster, "right", critChance(monster, "right")),
    }
  }

  console.log(currentPlayer)
  console.log(currentMonster)
}

/*
fight
  strength vs stamina

  weapon hit
    if class weapon
      75% + weapon bonus
    50%

  dodge
    0% - 50%

  weapon damage
    left
      if class weapon
        if crit
          damage x 2
        damage
      damage

    if right
      if class weapon
        if crit
          damage x 2
        damage
      damage

    damage = left + right

  weapon effect
    if hit
      chance to apply effect

  health
    health = health + armor - damage
*/

module.exports = {
  fight,
  craftRecipe,
  learnRecipe,
  createLoot,
  createMaterial,
  createMonster,
  playerStatAverage,
  playerDamageAverage,
  randomProbability,
  levelUp
}