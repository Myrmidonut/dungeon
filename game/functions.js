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

module.exports = { randomProbability, dodge, levelUp }