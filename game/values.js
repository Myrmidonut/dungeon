const monsterNames = [
  "ogre",
  "goblin",
  "orc",
  "shield maiden",
  "dragon"
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
    monster: 0,//0.5,
    treasureChest: 0,//0.2,
    trap: 1,//0.2,
    empty: 0//0.1
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
    tool: 0.1,
    recipe: 0.1,
    weapon: 0.1,
    armor: 0.1,
    empty: 0.1,
    gold: 0.1,
    material: 0.4
  }
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
  "basic potion": {
    type: "potions",
    value: 1,
    materials: {
      organs: 1,
      metal: 1
    }
  },
  "improved potion" : {
    type: "potions",
    value: 2,
    materials: {
      organs: 2,
      metal: 2
    }
  },
  "basic bandage": {
    type: "bandages",
    value: 1,
    materials: {
      cloth: 1,
      bones: 1
    }
  }
}

const tools = {
  "basic hammer": {
    type: "metal",
    value: 1
  },
  "basic knife": {
    type: "cloth",
    value: 1
  }
}

module.exports = {
  monsterDodge,
  weaponNames,
  playerClasses,
  playerEffects,
  playerClassHitChance,
  tools,
  recipes,
  monsterRating,
  monsterNames,
  monsterEffects,
  probabilityTables
}