const player = {
  class: "thief",
  level: 5,
  room: 10,
  stats: {
    strength: 5,
    stamina: 8,
    agility: 1500
  },
  modifiedStats: {
    strength: 5,
    stamina: 8,
    agility: 150
  },
  effects: [
    {
      name: "weak",
      description: "less stamina",
      type: "stamina",
      value: 0.8
    }
  ],
  weapons: {
    left: {
      class: "thief",
      name: "",
      damage: {
        minimum: 10,
        maximum: 15
      },
      critChance: 0.2
    },
    right: {
      class: "paladin",
      name: "",
      damage: {
        minimum: 5,
        maximum: 14
      },
      critChance: 0.3
    },
  },
  armor: {
    helmet: 2,
    chest: 2,
    pants: 2,
    boots: 1,
    gloves: 3
  },
  toy: {
    name: "candle",
    value: 3
  },
  tools: {
    bones: {
      name: "saw",
      level: "basic",
      value: 1
    },
    blood: {
      name: "bucket",
      level: "",
      value: 0
    },
    brains: {
      name: "spoon",
      level: "improved",
      value: 3
    }
  },
  bodyParts: {
    bones: 2,
    blood: 5,
    brains: 7
  },
  potion: {
    level: "basic",
    value: 1,
    amount: 1
  },
  bandage: {
    level: "basic",
    value: 1,
    amount: 1
  },
  food: {
    level: "basic",
    value: 1,
    amount: 1
  }
}

module.exports = player