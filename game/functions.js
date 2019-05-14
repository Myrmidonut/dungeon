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

function createToyName(gameValues) {
  const first = gameValues.toyNames.first[Math.floor(Math.random() * gameValues.toyNames.first.length)];
  const second = gameValues.toyNames.second[Math.floor(Math.random() * gameValues.toyNames.second.length)];
  
  return `${first} ${second}`;
}

function createWeaponName(gameValues) {
  const first = gameValues.weaponNames.first[Math.floor(Math.random() * gameValues.weaponNames.first.length)];
  const second = gameValues.weaponNames.second[Math.floor(Math.random() * gameValues.weaponNames.second.length)];
  const third = gameValues.weaponNames.third[Math.floor(Math.random() * gameValues.weaponNames.third.length)];

  return `${first} ${second} of ${third}`;
}

function createShieldName(gameValues) {
  const first = gameValues.weaponNames.first[Math.floor(Math.random() * gameValues.weaponNames.first.length)];
  const second = "shield";
  const third = gameValues.weaponNames.third[Math.floor(Math.random() * gameValues.weaponNames.third.length)];

  return `${first} ${second} of ${third}`;
}

function playerDodge(player) {
  return round(log(player.stats.agility, 3, 1), 2) / 10;
}

function disarmTrap(player) {
  console.log("disarm:", round(log(player.stats.agility, 3, 0), 2) / 10)

  return randomRoll(round(log(player.stats.agility, 3, 0), 2) / 10);
}

function getClassStat(player) {
  if (player.class === "barbarian") return "strength";
  else if (player.class === "thief") return "agility";
  else return "stamina";
}

function selectLevel(player, level) {
  if (level > 0 && level <= player.maxLevel) {
    player.level = level;

    return level;
  } else return "selected level outside character range"
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
  player.maxLevel += 1;

  return player.maxLevel;
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

function monsterWeapons(player, gameValues) {
  const hands = Math.floor(Math.random() * 2 + 1);

  if (hands === 1) {
    return (
      {
        left: {
          damage: {
            minimum: Math.round(playerDamageAverage(player) * 0.666),
            maximum: Math.round(playerDamageAverage(player) * 1.333)
          },
          name: createWeaponName(gameValues),
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
          name: createWeaponName(gameValues),
          critChance: 0.2
        },
        right: {
          damage: {
            minimum: Math.round(playerDamageAverage(player) * 0.666 / 2),
            maximum: Math.round(playerDamageAverage(player) * 1.333 / 2)
          },
          name: createWeaponName(gameValues),
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

function addEffects(player, gameValues) {
  const effects = randomEffects(gameValues.playerEffects)

  effects.forEach(e => {
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
    weapons: monsterWeapons(player, gameValues),
    dodge: monsterDodge(gameValues),
    armor: Math.round(armor(player) * gameValues.monsterRating[type]),
    hitChance: gameValues.monsterRating[type]
  };

  return monster;
}

function upgradeWeaponSlot(player, hand, gameValues) {
  const updatedStat = randomProbability(gameValues.probabilityTables.weaponUpdate);

  const weapon = {
    class: player.class,
    name: createWeaponName(gameValues),
    damage: player.weapons[hand].damage,
    critChance: player.weapons[hand].critChance,
    hitChance: player.weapons[hand].hitChance
  }

  if (updatedStat === "damage") {
    weapon[updatedStat].maximum = Math.floor(weapon[updatedStat].maximum * gameValues.weaponIncrease[updatedStat]);
    weapon[updatedStat].minimum = Math.floor(player.weapons[hand][updatedStat].maximum * 0.6);
  } else {
    weapon[updatedStat] = round((weapon[updatedStat] + gameValues.weaponIncrease[updatedStat]), 1);
  }

  return weapon;
}

function removeWeapon(shield) {
  const removedWeapon = {
    name: shield,
    damage: {
      maximum: 0,
      minimum: 0
    },
    critChance: 0,
    hitChance: 0
  }

  return removedWeapon;
}

function upgradeWeapons(player, gameValues) {
  let hand = randomProbability(gameValues.probabilityTables.weaponHand);
  let newWeapon = upgradeWeaponSlot(player, hand, gameValues);

  if (player.class === "thief") {
    player.weapons[hand] = newWeapon;
  } else if (player.class === "barbarian") {
    hand = "left";
    newWeapon = upgradeWeaponSlot(player, hand, gameValues);
    player.weapons.left = newWeapon;
    player.weapons.right = removeWeapon("");
  } else {
    if (hand === "left") {
      player.weapons.left = removeWeapon("shield");
      player.weapons.shield.armor += 1;
      player.weapons.shield.name = createShieldName(gameValues);
      newWeapon = player.weapons.shield;
    } else {
      newWeapon = upgradeWeaponSlot(player, "right", gameValues);
      player.weapons.right = newWeapon;
    }
  }

  return {
    hand: hand,
    weapon: newWeapon
  }
}

function upgradeArmor(player, gameValues) {
  const randomArmor = randomProbability(gameValues.probabilityTables.armor);

  player.armor[randomArmor] += 1;

  return randomArmor;
}

function upgradeToy(player, gameValues) {
  player.toy.value += 1;
  player.toy.name = createToyName(gameValues);

  return player.toy;
}

function upgradePotion(player, gameValues) {
  player.potion.value += 1;
  player.potion.level = gameValues.itemLevels[player.potion.value].level;

  return player.potion;
}

function upgradeBandage(player, gameValues) {
  player.bandage.value += 1;
  player.bandage.level = gameValues.itemLevels[player.bandage.value].level;

  return player.bandage;
}

function upgradeTool(player, gameValues) {
  const randomTool = randomProbability(gameValues.probabilityTables.bodyParts);

  player.tools[randomTool].value += 1;
  player.tools[randomTool].level = gameValues.itemLevels[player.tools[randomTool].value].level

  return player.tools[randomTool]
}

function usePotion(player, gameValues) {
  if (player.potion.amount <= 0) return "not enough potions";

  let removedEffects = [];

  for (let i = 0; i < gameValues.potion[player.potion.value]; i++) {
    if (player.effects.length !== 0) {
      const randomEffect = Math.floor(Math.random() * player.effects.length);

      removedEffects.push(player.effects[randomEffect]);

      player.effects.splice(randomEffect, 1);
    }
  }

  player.potion.amount -= 1;

  return removedEffects;
}

function useBandage(player, gameValues) {
  if (player.bandage.amount <= 0) return "not enough bandages";

  const heal = Math.round(gameValues.bandage[player.bandage.value] * player.modifiedStats.stamina * 10);

  if ((player.health + heal) > (player.stats.stamina * 10)) {
    player.health = player.stats.stamina * 10;
  } else {
    player.health += heal;
  }

  player.bandage.amount -= 1;

  return heal;
}

function useFood(player) {
  if (player.food.amount <= 0) return "not enough food";

  player.health = player.stats.stamina * 10;

  player.food.amount -= 1;

  return "healed full";
}

function createLoot(player, gameValues) {
  let type = randomProbability(gameValues.probabilityTables.loot);

  if (type === "weapon") {
    return upgradeWeapons(player, gameValues);
  } else if (type === "armor") {
    return upgradeArmor(player, gameValues);
  } else if (type === "potion") {
    if (player.potion.value >= 6) return upgradeWeapons(player, gameValues);
    else return upgradePotion(player, gameValues);
  } else if (type === "bandage") {
    if (player.bandage.value >= 6) return upgradeWeapons(player, gameValues);
    else return upgradeBandage(player, gameValues);
  } else if (type === "tool") {
    return upgradeTool(player, gameValues);
  } else if (type === "toy") {
    return upgradeToy(player, gameValues);
  }
}

function scavenge(player, gameValues) {
  const material = randomProbability(gameValues.probabilityTables.bodyParts);
  const amount = (player.tools[material].value + perception(player))

  player.bodyParts[material] += amount;

  return `${amount} ${material}`;
}

function craft(player, type, gameValues) {
  let enoughBodyParts = true;

  Object.keys(gameValues.recipes[type]).forEach(e => {
    if (player.bodyParts[e] < (gameValues.recipes[type][e] * player[type].value)) {
      enoughBodyParts = false;
    }
  })

  if (enoughBodyParts) {
    Object.keys(gameValues.recipes[type]).forEach(e => {
      player.bodyParts[e] -= (gameValues.recipes[type][e] * player[type].value);
    })

    player[type].amount += player[type].value;
    
    return `created a level ${player[type].value} ${type}`;
  } else return "not enough body parts"
}

function damage(player, hand) {
  const min = player.weapons[hand].damage.minimum;
  const max = player.weapons[hand].damage.maximum;

  if (Math.random() >= player.weapons[hand].critChance) {
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
  return Object.values(player.armor).reduce((total, e) => total + e) + player.weapons.shield.armor;
}

function fight(player, monster, gameValues) {
  let currentPlayer = {
    name: "player",
    strength: player.modifiedStats.strength,
    stamina: player.modifiedStats.stamina,
    health: player.health,
    armor: armor(player),
    dodge: playerDodge(player),
    weapons: player.weapons,
    hit: {
      left: player.weapons.left.hitChance,
      right: player.weapons.right.hitChance
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

        damageDealt += damage(attacker, "left").value;
        damageDealt += attacker.strength;
      } else console.log("dodge left")
    } else console.log("miss left")

    if (randomRoll(attacker.hit.right)) {
      if (!randomRoll(defender.dodge)) {
        console.log("hit right")

        damageDealt += damage(attacker, "right").value;
        damageDealt += attacker.strength;
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

  if (defender.name === "player") player.health = defender.health;

  return defender.name;
}

function room(player, gameValues) {
  console.log("player rooms:", player.room)

  if (player.room <= 0) {
    return {
      win: true,
      loot: null,
      message: "room 0"
    };
  } else if (player.room > 10 && player.level === player.maxLevel) {
    levelUp(player, gameValues);

    return {
      win: true,
      loot: null,
      message: `finished map and leveled up to ${player.maxLevel}`
    };
  } else if (player.room > 10) {
    return "finished map";
  } else {
    const monster = createMonster(player, gameValues);

    return encounter(player, monster, gameValues);
  }
}

function encounter(player, monster, gameValues) {
  const type = randomProbability(gameValues.probabilityTables.encounter);
  const result = {
    win: false,
    loot: null,
    message: ""
  }

  console.log("encounter type:", type)

  applyEffects(player, player.effects);

  if (type === "monster") {
    if (fight(player, monster, gameValues) === "player") {
      result.win = true;
      result.loot = createLoot(player, gameValues);
      result.message = "win against monster"

      player.room += 1;
    } else {
      result.message = "you lost to the monster"
    }
  } else if (type === "treasureChest") {
    if (randomProbability(gameValues.probabilityTables.treasureChest) === "monster") {
      if (fight(player, monster, gameValues) === "player") {
        result.win = true;
        result.loot = createLoot(player, gameValues);
        result.message = "win against treasure chest monster"

        player.room += 1;
      } else {
        result.message = "you lost to the treasure chest monster"
      }
    } else {
      result.win = true;
      result.loot = createLoot(player, gameValues);
      result.message = "found treasure chest"

      player.room += 1;
    }
  } else if (type === "trap") {
    if (disarmTrap(player)) {
      result.win = true;
      result.loot = createLoot(player, gameValues);
      result.message = "disarmed trap"
    } else {
      result.message = "you lost to the trap"

      addEffects(player, gameValues);
    }

    player.room += 1;
  } else {
    result.win = true;
    result.message = "empty room"

    player.room += 1;
  }

  return result;
}

function resetPlayer(player) {
  player.health = player.stats.stamina * 10;
  player.effects = [];

  return player;
}

function createPlayer(database) {
  const player = {
    name: database.name,
    class: database.class,
    level: database.level,
    maxLevel: database.max_level,
    room: database.room,
    health: database.stamina * 10,
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
        critChance: database.weapons_left_critchance,
        hitChance: database.weapons_left_hitchance
      },
      right: {
        class: database.weapons_right_class,
        name: database.weapons_right_name,
        damage: {
          minimum: database.weapons_right_damage_maximum,
          maximum: database.weapons_right_damage_minimum
        },
        critChance: database.weapons_right_critchance,
        hitChance: database.weapons_right_hitchance
      },
      shield: {
        name: database.weapons_shield_name,
        armor: database.weapons_shield_armor
      }
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
  selectLevel,
  usePotion,
  useBandage,
  useFood,
  room,
  createPlayer,
  craft,
  scavenge
}