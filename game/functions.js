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

function classStat(player) {
  if (player.class === "barbarian") return "strength"
  else if (player.class === "thief") return "agility"
  else return "stamina"
}

function levelUp(player, probability) {
  for (let stat in player.stats) {
    if (stat === classStat(player) && Math.random() >= probability.classStat) {
      player.stats[stat] += 1
    } else if (stat !== classStat(player) && Math.random() >= probability.stat) {
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

function generateMonster(names, type, playerStatAverage, monsterRating) {
  console.log("playerStatAverage: ", playerStatAverage)

  function stat() {
    let rating

    if (type === "normal") rating = monsterRating.normal
    else rating = monsterRating.elite

    let max = rating * playerStatAverage
    let min = (rating - 0.25) * playerStatAverage

    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function name() {
    return names[Math.floor(Math.random() * names.length)]
  }

  function adjectives() {
    let amount = Math.floor(Math.random() * 4)

    
  }

  return {
    name: name(),
    type: type,
    adjectives: [],  // 0-3 andjectives
    stats: {
      strength: stat(),
      stamina: stat(),
      endurance: stat(),
      agility: stat()
    }
  }
}

module.exports = { generateMonster, playerStatAverage, randomProbability, dodge, levelUp }