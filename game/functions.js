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

function generateMonster(names, type, adjectives, playerStatAverage, monsterRating) {
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

module.exports = { generateMonster, playerStatAverage, randomProbability, dodge, levelUp }