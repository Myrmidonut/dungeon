const player = {
  class: "thief",
  stats: {
    strength: 5,
    stamina: 8,
    endurance: 9,
    agility: 15,
    perception: 3
  },
  weapons: {
    left: 6,
    right: 4
  },
  armor: {
    helmet: 2,
    chest: 5,
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