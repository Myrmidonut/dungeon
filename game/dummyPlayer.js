const player = {
  class: "thief",
  level: 5,
  stats: {
    strength: 5,
    stamina: 8,
    agility: 15
  },
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
  toy: 3,
  tools: {
    cloth: {
      name: "basic scissors",
      value: 2
    },
    bones: {
      name: "basic knife",
      value: 5
    },
    organs: {
      name: "basic spoon",
      value: 7
    },
    metal: {
      name: "basic hammer",
      value: 1
    }
  },
  materials: {
    cloth: 2,
    bones: 5,
    organs: 7,
    metal: 1
  },
  potions: {
    "basic potion": {
      value: 1,
      amount: 1
    }
  },
  bandages: {
    name: "basic bandage",
    value: 1,
    amount: 3
  },
  recipes: [
    "basic potion",
    "improved potion",
    "basic bandage"
  ]
}

module.exports = player