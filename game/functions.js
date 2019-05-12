function randomProbability(probabilityTable) {
	let i;
  let sum = 0;
  const random = Math.random();

  for (i in probabilityTable) {
    sum += probabilityTable[i];

    if (random <= sum) return i;
  }
}

function round(value, decimals) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function randomRoll(value) {
  if (Math.random() > value) return false;
  else return true;
}

function log(value, base, min) {
  result = Math.log(value) / Math.log(base);

  if (result >= min) return result;
  else return min;
}

function perception(player) {
  return Math.floor(log(player.stats.agility, 3, 1)) + player.toy.value;
}

function monsterDodge(gameValues) {
  return gameValues.monsterDodge.value;
}

function createWeaponName(names) {
  const first = names.first[Math.floor(Math.random() * names.first.length)];
  const second = names.second[Math.floor(Math.random() * names.second.length)];
  const third = names.third[Math.floor(Math.random() * names.third.length)];

  return `${first} ${second} of ${third}`;
}

function playerDodge(player) {
  return round(log(player.stats.agility, 3, 1), 2) / 10;
}

function disarmTrap(player) {
  return randomRoll(round(log(player.stats.agility, 3, 0), 2) / 10);
}

function getClassStat(player) {
  if (player.class === "barbarian") return "strength";
  else if (player.class === "thief") return "agility";
  else return "stamina";
}

function levelUp(player, gameValues) {
  for (let stat in player.stats) {
    if (stat === getClassStat(player) && Math.random() <= gameValues.probabilityTables.levelUp.classStat) {
      player.stats[stat] += 1;
    } else if (stat !== getClassStat(player) && Math.random() <= gameValues.probabilityTables.levelUp.stat) {
      player.stats[stat] += 1;
    }
  }

  player.level += 1;
}

function playerStatAverage(player) {
  let average = 0;

  for (let stat in player.stats) {
    average += player.stats[stat];
  }

  return average / Object.keys(player.stats).length;
}

function playerDamageAverage(player) {
  return (
    (player.weapons.left.damage.minimum 
    + player.weapons.left.damage.maximum
    + player.weapons.right.damage.minimum
    + player.weapons.right.damage.maximum) / 4
  );
}

function monsterWeapons(player, names) {
  const hands = Math.floor(Math.random() * 2 + 1);

  if (hands === 1) {
    return (
      {
        left: {
          damage: {
            minimum: Math.round(playerDamageAverage(player) * 0.666),
            maximum: Math.round(playerDamageAverage(player) * 1.333)
          },
          name: createWeaponName(names),
          critChance: 0.2
        },
        right: {
          damage: {
            minimum: 0,
            maximum: 0,
          },
          critChance: 0
        }
      }
    );
  } else {
    return (
      {
        left: {
          damage: {
            minimum: Math.round(playerDamageAverage(player) * 0.666 / 2),
            maximum: Math.round(playerDamageAverage(player) * 1.333 / 2)
          },
          name: createWeaponName(names),
          critChance: 0.2
        },
        right: {
          damage: {
            minimum: Math.round(playerDamageAverage(player) * 0.666 / 2),
            maximum: Math.round(playerDamageAverage(player) * 1.333 / 2)
          },
          name: createWeaponName(names),
          critChance: 0.2
        }
      }
    );
  }
}

function monsterName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

function randomEffects(effects) {
  let effectsCopy = effects.slice();
  let amount = Math.floor(Math.random() * 4);
  let result = [];

  for (let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * effectsCopy.length);
    const effect = effectsCopy[random];

    effectsCopy.splice(random, 1);

    result.push(effect);
  }

  return result;
}

function addEffects(player, effect) {
  effect.forEach(e => {
    if (!player.effects.some(f => f.name === e.name)) {
      player.effects.push(e);
    }
  })
}

function applyEffects(player, effects) {
  effects.forEach(e => {
    player.modifiedStats[e.type] = Math.floor(player.stats[e.type] * e.value);
  })
}

function monsterStat(type, player, playerStatAverage, monsterRating) {
  let rating = monsterRating.normal;

  if (type === "elite") rating = monsterRating.elite;

  let max = (monsterRating.scaling * player.level + rating) * playerStatAverage;
  let min = (monsterRating.scaling * player.level + (rating * 0.75)) * playerStatAverage;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createMonster(player, gameValues) {
  const type = randomProbability(gameValues.probabilityTables.monster);
  const average = playerStatAverage(player);

  const monster = {
    name: monsterName(gameValues.monsterNames),
    type: type,
    adjectives: randomEffects(gameValues.monsterEffects),
    stats: {
      strength: monsterStat(type, player, average, gameValues.monsterRating),
      stamina: monsterStat(type, player, average, gameValues.monsterRating),
      agility: monsterStat(type, player, average, gameValues.monsterRating)
    },
    weapons: monsterWeapons(player, gameValues.weaponNames),
    dodge: monsterDodge(gameValues),
    armor: Math.round(armor(player) * gameValues.monsterRating[type]),
    hitChance: gameValues.monsterRating[type]
  };

  return monster;
}

function upgradeWeapon(player) {

}

function upgradeArmor(player) {

}

function upgradeTool(player) {

}

function createLoot(player, gameValues) {
  let type = randomProbability(gameValues.probabilityTables.loot);

  if (type === "tool") {
    const randomTool = randomProbability(gameValues.probabilityTables.bodyParts);

    player.tools[randomTool].value += 1;
    player.tools[randomTool].level = gameValues.tools[player.tools[randomTool].value].level
  } else if (type === "material") {
    type = createMaterial(player, material);
  } else if (type === "gold") {
    type = `${perception(player)} gold`;
  }

  return type;
}

function createMaterial(player, material) {
  if (material === "empty") return "empty";
  else return `${player.tools[material].value + perception(player)} ${material}`;
}

function craftRecipe(player, type, recipes) {
  if (player.recipes.indexOf(type) !== -1) {
    let hasMaterial = true;

    for (let material in recipes[type].materials) {
      if (player.materials[material] < recipes[type].value) {
        hasMaterial = false;
      }
    }

    if (hasMaterial) {
      for (let material in recipes[type].materials) {
        player.materials[material] -= recipes[type].value;
      }

      player[recipes[type]["type"]][type].amount += perception(player);

      return "crafted";
    } else return "not enough materials";
  } else return "unknown recipe";
}

function learnRecipe(player, recipe) {
  if (player.recipes.indexOf(recipe) === -1) {
    player.recipes.push(recipe);
  }
}

function hitChance(player, hand, gameValues) {
  if (player.class === player.weapons[hand].class) {
    return gameValues.playerClassHitChance.class;
  } else {
    return gameValues.playerClassHitChance.nonClass;
  }
}

function critChance(player, hand) {
  if (player.class === player.weapons[hand].class) {
    return player.weapons[hand].critChance;
  } else {
    return 0;
  }
}

function damage(player, hand) {
  const min = player.weapons[hand].damage.minimum;
  const max = player.weapons[hand].damage.maximum;

  if (Math.random() >= critChance(player, hand)) {
    return (
      {
        crit: false,
        value: Math.floor(Math.random() * (max - min + 1)) + min
      }
    );
  } else {
    return (
      {
        crit: true,
        value: 2 * (Math.floor(Math.random() * (max - min + 1)) + min)
      }
    );
  }
}

function armor(player) {
  return Object.values(player.armor).reduce((total, e) => total + e);
}

function fight(player, monster, gameValues) {
  let currentPlayer = {
    name: "player",
    strength: player.modifiedStats.strength,
    stamina: player.modifiedStats.stamina,
    health: player.modifiedStats.stamina * 10,
    armor: armor(player),
    dodge: playerDodge(player),
    weapons: player.weapons,
    hit: {
      left: hitChance(player, "left", gameValues),
      right: hitChance(player, "right", gameValues)
    }
  };

  let currentMonster = {
    name: "monster",
    strength: monster.stats.strength,
    stamina: monster.stats.stamina,
    health: monster.stats.stamina * 10,
    armor: monster.armor,
    dodge: monster.dodge,
    hit: {
      left: monster.hitChance,
      right: monster.hitChance
    },
    weapons: monster.weapons
  };

  console.log(currentPlayer)
  console.log(currentMonster)

  let attacker = currentPlayer;
  let defender = currentMonster;

  while (currentPlayer.health > 0 && currentMonster.health > 0) {
    console.log("========================")
    console.log("attacker:", attacker.name, "health:", attacker.health)
    console.log("defender:", defender.name, "health:", defender.health)

    let damageDealt = 0;

    if (randomRoll(attacker.hit.left)) {
      if (!randomRoll(defender.dodge)) {
        console.log("hit left")

        damageDealt += damage(attacker, "left", critChance(attacker, "left")).value;
        damageDealt += attacker.strength;
        // + effects
      } else console.log("dodge left")
    } else console.log("miss left")

    if (randomRoll(attacker.hit.right)) {
      if (!randomRoll(defender.dodge)) {
        console.log("hit right")

        damageDealt += damage(attacker, "right", critChance(attacker, "right")).value;
        damageDealt += attacker.strength;
        // + effects
      } else console.log("dodge right")
    } else console.log("miss right")

    console.log("health before damage:", defender.health)
    console.log("total damage:", damageDealt)

    if (damageDealt > defender.armor) {
      defender.health -= (damageDealt - defender.armor);
    }

    console.log("health after damage:", defender.health)

    attacker === currentPlayer ? attacker = currentMonster : attacker = currentPlayer;
    defender === currentMonster ? defender = currentPlayer : defender = currentMonster;
  }

  console.log("======================")
  console.log("======================")
  console.log("winner:", defender.name, "health:", defender.health)

  return defender.name;
}

function room(player) {
  if (player.room <= 0) {
    return "room 0";
  } else if (player.room > 10) {
    levelUp(player, gameValues);

    return "leveled up"
  } else {
    const monster = createMonster(player, gameValues)

    encounter(player, monster, gameValues)
  }
}

function encounter(player, monster, gameValues) {
  const type = randomProbability(gameValues.probabilityTables.encounter);
  const loot = createLoot(player, gameValues);

  console.log("type:", type)

  applyEffects(player, player.effects);

  if (type === "monster") {
    if (fight(player, monster, gameValues) === "player") {
      console.log("monster loot:", loot)

      player.room += 1;
    } else {
      console.log("you lost to the monster")
    }
  } else if (type === "treasureChest") {
    if (randomProbability(gameValues.probabilityTables.treasureChest) === "monster") {
      if (fight(player, monster, gameValues) === "player") {
        console.log("treasure chest monster loot:", loot)

        player.room += 1;
      } else {
        console.log("you lost to the treasure chest monster")
      }
    } else {
      console.log("treasure chest loot:", loot)

      player.room += 1;
    }
  } else if (type === "trap") {
    if (true /*disarmTrap(player)*/) {
      console.log("trap loot:", loot)
    } else {
      console.log("you lost to the trap")

      addEffects(player, randomEffects(gameValues.playerEffects));
    }

    player.room += 1;
  } else {
    console.log("empty")

    player.room += 1;
  }

  console.log(player)
}

function resetPlayer(player) {
  player.health = player.stats.stamina * 10;
  player. effects = [];

  return player;
}

function createPlayer(database) {
  const player = {
    name: database.name,
    class: database.class,
    level: database.level,
    stats: {
      strength: database.strength,
      stamina: database.stamina,
      agility: database.agility
    },
    modifiedStats: {
      strength: database.strength,
      stamina: database.stamina,
      agility: database.agility
    },
    room: database.room,
    weapons: {
      left: {
        class: database.weapons_left_class,
        name: database.weapons_left_name,
        damage: {
          minimum: database.weapons_left_damage_maximum,
          maximum: database.weapons_left_damage_minimum
        },
        critChance: database.weapons_left_critchance
      },
      right: {
        class: database.weapons_right_class,
        name: database.weapons_right_name,
        damage: {
          minimum: database.weapons_right_damage_maximum,
          maximum: database.weapons_right_damage_minimum
        },
        critChance: database.weapons_right_critchance
      },
    },
    armor: {
      helmet: database.armor_helmet,
      chest: database.armor_chest,
      pants: database.armor_pants,
      boots: database.armor_boots,
      gloves: database.armor_gloves
    },
    toy: {
      name: database.toy_name,
      value: database.toy_value
    },
    tools: {
      cloth: {
        name: database.tools_cloth_name,
        value: database.tools_cloth_value
      },
      bones: {
        name: database.tools_bones_name,
        value: database.tools_bones_value
      },
      organs: {
        name: database.tools_organs_name,
        value: database.tools_organs_value
      },
      metal: {
        name: database.tools_metal_name,
        value: database.tools_metal_value
      }
    },
    materials: {
      cloth: database.materials_cloth,
      bones: database.materials_bones,
      organs: database.materials_organs,
      metal: database.materials_metal
    },
    potion: {
      name: database.potion_name,
      value: database.potion_value,
      amount: database.potion_amount
    },
    bandage: {
      name: database.bandage_name,
      value: database.bandage_value,
      amount: database.bandage_amount
    },
    food: {
      name: database.foot_name,
      value: database.food_value,
      amount: database.food_amount
    }
  }

  return resetPlayer(player)
}

module.exports = {
  room,
  createPlayer,
  encounter,
  fight,
  craftRecipe,
  learnRecipe,
  createLoot,
  createMaterial,
  createMonster,
  playerStatAverage,
  playerDamageAverage,
  randomProbability,
  levelUp
}