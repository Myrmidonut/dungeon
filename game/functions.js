function randomProbability(probabilityTable) {
	let i
  let sum = 0
  const random = Math.random()

  for (i in probabilityTable) {
    sum += probabilityTable[i]

    if (random <= sum) return i
  }
}

function round(value, decimals) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

function randomRoll(value) {
  if (Math.random() > value) return false
  else return true
}

function log(value, base, min) {
  result = Math.log(value) / Math.log(base)

  if (result >= min) return result
  else return min
}

function perception(player) {
  return Math.floor(log(player.stats.agility, 3, 1)) + player.toy
}

function monsterDodge() {
  return 0.2
}

function playerDodge(player) {
  return round(log(player.stats.agility, 3, 1), 2) / 10
}

function disarmTrap(player) {
  return randomRoll(round(log(player.stats.agility, 3, 0), 2) / 10)
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

function randomEffect(effects) {
  let effectsCopy = effects.slice()
  let amount = Math.floor(Math.random() * 4)
  let result = []

  for (let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * effectsCopy.length)
    const effect = effectsCopy[random]

    effectsCopy.splice(random, 1)

    result.push(effect)
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

function createMonster(names, type, effects, playerStatAverage, monsterRating, player) {
  return {
    name: monsterName(names),
    type: type,
    adjectives: randomEffect(effects),
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
  else return `${player.tools[material].value + perception(player)} ${material}`
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

      player[recipes[type]["type"]][type].amount += perception(player)

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
  return Object.values(player.armor).reduce((total, e) => total + e)
}

function fight(player, monster, playerClassHitChance) {
  let currentPlayer = {
    name: "player",
    strength: player.stats.strength,
    stamina: player.stats.stamina,
    health: player.stats.endurance * 10,
    armor: armor(player),
    dodge: playerDodge(player),
    weapons: player.weapons,
    hit: {
      left: hitChance(player, "left", playerClassHitChance),
      right: hitChance(player, "right", playerClassHitChance)
    }
  }

  let currentMonster = {
    name: "monster",
    strength: monster.stats.strength,
    stamina: monster.stats.stamina,
    health: monster.stats.endurance * 10,
    armor: monster.armor,
    dodge: monster.dodge,
    hit: {
      left: monster.hitChance,
      right: monster.hitChance
    },
    weapons: monster.weapons
  }

  console.log(currentPlayer)
  console.log(currentMonster)

  let attacker = currentPlayer
  let defender = currentMonster

  while (currentPlayer.health > 0 && currentMonster.health > 0) {
    console.log("========================")
    console.log("attacker:", attacker.name, "health:", attacker.health)
    console.log("defender:", defender.name, "health:", defender.health)

    let damageDealt = 0

    if (randomRoll(attacker.hit.left)) {
      if (!randomRoll(defender.dodge)) {
        console.log("hit left")
        damageDealt += damage(attacker, "left", critChance(attacker, "left")).value
      } else console.log("dodge left")
    } else console.log("miss left")

    if (randomRoll(attacker.hit.right)) {
      if (!randomRoll(defender.dodge)) {
        console.log("hit right")
        damageDealt += damage(attacker, "right", critChance(attacker, "right")).value
      } else console.log("dodge right")
    } else console.log("miss right")

    console.log("health before damage:", defender.health)
    console.log("total damage:", damageDealt)

    if (damageDealt > defender.armor) {
      defender.health -= (damageDealt - defender.armor)
    }

    console.log("health after damage:", defender.health)

    attacker === currentPlayer ? attacker = currentMonster : attacker = currentPlayer
    defender === currentMonster ? defender = currentPlayer : defender = currentMonster
  }

  console.log("======================")
  console.log("======================")
  console.log("winner:", defender.name, "health:", defender.health)

  return defender.name
}

function encounter(player, monster, playerClassHitChance, encounterTable, lootTable, materialTable, treasureChestTable) {
  const type = randomProbability(encounterTable)
  const loot = createLoot(player, randomProbability(lootTable), randomProbability(materialTable))

  if (type === "monster") {
    if (fight(player, monster, playerClassHitChance) === "player") {
      console.log("monster loot:", loot)
    } else {
      console.log("you lost to the monster")
    }
  } else if (type === "treasureChest") {
    if (randomProbability(treasureChestTable) === "monster") {
      if (fight(player, monster, playerClassHitChance) === "player") {
        console.log("treasure chest monster loot:", loot)
      } else {
        console.log("you lost to the treasure chest monster")
      }
    } else {
      console.log("treasure chest loot:", loot)
    }
  } else if (type === "trap") {
    if (disarmTrap(player)) {
      console.log("trap loot:", loot)
    } else {
      console.log("you lost to the trap")

      // negative effect missing
    }
  } else {
    console.log("empty")
  }
}

/*
trap
  disarm with perception
    loot

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
  encounter,
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