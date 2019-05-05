const monsterNames = [
  "ogre",
  "goblin",
  "orc"
]

const playerEffects = [
  {
    name: "weak",
    description: "less strength",
    type: "strength",
    value: 0.8
  }
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

const playerClassHitChance = {
  class: 0.75,
  nonClass: 0.5
}

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
  playerEffects,
  playerClassHitChance,
  tools,
  recipes,
  monsterRating,
  monsterNames,
  monsterEffects,
  probabilityTables
}