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

function createWeaponName(gameValues) {
  const first = gameValues.weaponNames.first[Math.floor(Math.random() * gameValues.weaponNames.first.length)];
  const second = gameValues.weaponNames.second[Math.floor(Math.random() * gameValues.weaponNames.second.length)];
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
    weapon[updatedStat].maximum *= gameValues.weaponIncrease[updatedStat];
    weapon[updatedStat].minimum = player.weapons[hand][updatedStat].maximum * 0.6;
  } else {
    weapon[updatedStat] += gameValues.weaponIncrease[updatedStat];
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

/*function updateShield(player, gameValues) {
  const shield = {
    class: player.class,
    name: createWeaponName(gameValues),
    damage: 0,
    critChance: 0,
    hitChance: 0
  }

  // shield.armor

  return weapon;
}*/

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

      // shield updates
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
    return upgradeWeapons(player, gameValues)
  } else if (type === "armor") {
    return upgradeArmor(player, gameValues)
  } else if (type === "potion") {
    return upgradePotion(player, gameValues)
  } else if (type === "bandage") {
    return upgradeBandage(player, gameValues)
  } else if (type === "tool") {
    return upgradeTool(player, gameValues)
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
    health: player.health,
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

  if (defender.name === "player") player.health = defender.health;

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
    if (disarmTrap(player)) {
      console.log("trap loot:", loot)
    } else {
      console.log("you lost to the trap")

      addEffects(player, gameValues);
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
  player.effects = [];

  return player;
}

function createPlayer(database) {
  const player = {
    name: database.name,
    class: database.class,
    level: database.level,
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
  usePotion,
  useBandage,
  useFood,
  room,
  createPlayer,
  encounter,
  fight,
  craft,
  scavenge,
  createLoot,
  createMonster,
  playerStatAverage,
  playerDamageAverage,
  randomProbability,
  levelUp
}