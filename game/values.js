const monsterNames = [
  "ogre",
  "goblin",
  "orc",
  "shield maiden",
  "dragon",
  "lizard",
  "giant",
  "rat"
]

const weaponNames = {
  first: [
    "giant",
    "massive",
    "tiny",
    "colorful",
    "hilarious",
    "amazing",
    "titanic",
    "invisible",
    "screaming",
    "vibrating",
    "annoying",
    "talking",
    "slimey",
    "smelly",
    "glowing"
  ],
  second: [
    "hammer",
    "sword",
    "dagger",
    "axe",
    "pole",
    "tableleg",
    "pike",
    "stone",
    "morningstar",
    "net",
    "gauntlet",
    "whip",
    "laser sword",
    "mace"
  ],
  third: [
    "awesomeness",
    "hilarity",
    "destruction",
    "devastation",
    "bloodbaths",
    "slaughter",
    "throwing"
  ]
}

const toyNames = {
  first: [
    "red",
    "green",
    "blue",
    "white",
    "black"
  ],
  second: [
    "candle",
    "torch",
    "cat",
    "bat",
    "fairy",
    "glasses"
  ]
}

const itemLevels = [
  {
    level: "",
    value: 0
  },
  {
    level: "basic",
    value: 1
  },
  {
    level: "average",
    value: 2
  },
  {
    level: "improved",
    value: 3
  },
  {
    level: "excellent",
    value: 4
  },
  {
    level: "perfect",
    value: 5
  },
  {
    level: "supreme",
    value: 6
  }
]

const potion = [0, 1, 1, 2, 2, 3, 3]

const bandage = [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]

const food = [0, 1, 2, 3, 4, 5, 6]

const playerEffects = [
  {
    name: "slow",
    description: "less strength",
    type: "strength",
    value: 0.8
  },
  {
    name: "weak",
    description: "less stamina",
    type: "stamina",
    value: 0.8
  },
  {
    name: "blind",
    description: "less agility",
    type: "agility",
    value: 0.8
  },
]

const monsterEffects = [
  // strength:
  {
    name: "giant",
    description: "higher strength",
    type: "strength",
    value: 1.2
  },
  {
    name: "tiny",
    description: "less strength",
    type: "strength",
    value: 0.8
  },
  // stamina:
  {
    name: "hardened",
    description: "higher defense",
    type: "stamina",
    value: 1.2
  },
  {
    name: "squishy",
    description: "less defense",
    type: "stamina",
    value: 0.8
  },
  // dodge:
  {
    name: "cautious",
    description: "higher dodge",
    type: "dodge",
    value: 1.2
  },
  {
    name: "blind",
    description: "less dodge",
    type: "dodge",
    value: 0.8
  },
  // hit:
  {
    name: "fast",
    description: "higher hit chance",
    type: "hit",
    value: 1.2
  },
  {
    name: "slow",
    description: "less hit chance",
    type: "hit",
    value: 0.8
  },
  // crit:
  {
    name: "wild",
    description: "higher crit chance",
    type: "crit",
    value: 1.2
  },
  {
    name: "weak",
    description: "less crit chance",
    type: "crit",
    value: 0.8
  },
  // special:
  {
    name: "smelly",
    description: "poison cloud",
    type: "damage effects",
    value: 0
  },
  {
    name: "toxic",
    description: "return damage on hit",
    type: "damage effects",
    value: 0
  }
]

const probabilityTables = {
  levelUp: {
    classStat: 0.9,
    stat: 0.5
  },
  encounter: {
    monster: 1,//0.5,
    treasureChest: 0,//0.2,
    trap: 0,//0.2,
    empty: 0//0.1
  },
  monster: {
    normal: 0.9,
    elite: 0.1
  },
  bodyParts: {
    blood: 0.333,
    bones: 0.333,
    brains: 0.334
  },
  treasureChest: {
    monster: 0.25,
    treasure: 0.75
  },
  loot: {
    weapon: 0,//0.167,
    armor: 0,//0.167,
    potion: 0,//0.167,
    bandage: 0,//0.167,
    tool: 0,//0.167
    toy: 1//0.165
  },
  armor: {
    helmet: 0.2,
    chest: 0.2,
    pants: 0.2,
    boots: 0.2,
    gloves: 0.2
  },
  weaponUpdate: {
    hitChance: 0.333,
    critChance: 0.333,
    damage: 0.334
  },
  weaponHand: {
    left: 0.5,
    right: 0.5
  }
}

const weaponIncrease = {
  damage: 1.5,
  critChance: 0.1,
  hitChance: 0.1
}

const monsterRating = {
  scaling: 0.05,
  normal: 0.3,
  elite: 0.7
}

const monsterDodge = {
  value: 0.2
}

const playerClassHitChance = {
  class: 0.75,
  nonClass: 0.5
}

const playerClasses = [
  {
    type: "barbarian",
    stat: "strength"
  },
  {
    type: "paladin",
    stat: "stamina"
  },
  {
    type: "thief",
    stat: "agility"
  }
]

const recipes = {
  potion: {
    blood: 1,
    brains: 1
  },
  bandage: {
    bones: 1,
    blood: 1
  },
  food: {
    bones: 1,
    brains: 1
  }
}

module.exports = {
  toyNames,
  weaponIncrease,
  potion,
  bandage,
  food,
  itemLevels,
  monsterDodge,
  weaponNames,
  playerClasses,
  playerEffects,
  playerClassHitChance,
  recipes,
  monsterRating,
  monsterNames,
  monsterEffects,
  probabilityTables
}