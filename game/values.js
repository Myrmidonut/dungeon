const monsterNames = [
  "ogre",
  "goblin",
  "orc"
]

const adjectives = [
  {
    name: "giant",
    description: "higher strength",
    type: "strength",
    value: 0.2
  },
  {
    name: "tiny",
    description: "less strength",
    type: "strength",
    value: -0.2
  },
  {
    name: "smelly",
    description: "poison cloud",
    type: "damage",
    value: 0
  },
  {
    name: "toxic",
    description: "return damage on hit",
    type: "damage",
    value: 0
  },
  {
    name: "blind",
    description: "less dodge",
    type: "dodge",
    value: -0.2
  },
  {
    name: "cautious",
    description: "higher dodge",
    type: "dodge",
    value: 0.2
  },
  {
    name: "wild",
    description: "higher attack",
    type: "attack",
    value: 0.2
  },
  {
    name: "cautious",
    description: "less dodge",
    type: "attack",
    value: -0.2
  },
  {
    name: "hardened",
    description: "higher defense",
    type: "defense",
    value: 0.2
  },
  {
    name: "squishy",
    description: "less defense",
    type: "defense",
    value: -0.2
  }
]

const probabilityTables = {
  levelUp: {
    classStat: 0.1,
    stat: 0.5
  },
  encounter: {
    monster: 0.5,
    treasureChest: 0.2,
    trap: 0.2,
    empty: 0.1
  },
  monster: {
    normal: 0.9,
    elite: 0.1
  },
  material: {
    cloth: 0.225,
    metal: 0.225,
    bones: 0.225,
    organs: 0.225,
    empty: 0.1
  },
  treasureChest: {
    monster: 0.25,
    treasure: 0.75
  },
  loot: {
    gear: 0.2,
    gold: 0.2,
    material: 0.5,
    empty: 0.1
  }
}

const monsterRating = {
  normal: 0.5,
  elite: 0.9
}

module.exports = {
  monsterRating,
  monsterNames,
  adjectives,
  probabilityTables
}