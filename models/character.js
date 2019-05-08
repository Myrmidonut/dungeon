'use strict';

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    level: DataTypes.INTEGER,

    strength: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,

    weapons_left_class: DataTypes.STRING,
    weapons_left_name: DataTypes.STRING,
    weapons_left_damage_maximum: DataTypes.INTEGER,
    weapons_left_damage_minimum: DataTypes.INTEGER,
    weapons_left_critchance: DataTypes.FLOAT,

    weapons_right_class: DataTypes.STRING,
    weapons_right_name: DataTypes.STRING,
    weapons_right_damage_maximum: DataTypes.INTEGER,
    weapons_right_damage_minimum: DataTypes.INTEGER,
    weapons_right_critChance: DataTypes.FLOAT,

    armor_helmet: DataTypes.INTEGER,
    armor_chest: DataTypes.INTEGER,
    armor_pants: DataTypes.INTEGER,
    armor_boots: DataTypes.INTEGER,
    armor_gloves: DataTypes.INTEGER,

    toy_name: DataTypes.STRING,
    toy_value: DataTypes.INTEGER,

    tools_cloth_name: DataTypes.STRING,
    tools_cloth_value: DataTypes.INTEGER,
    tools_bones_name: DataTypes.STRING,
    tools_bones_value: DataTypes.INTEGER,
    tools_organs_name: DataTypes.STRING,
    tools_organs_value: DataTypes.INTEGER,
    tools_metal_name: DataTypes.STRING,
    tools_metal_value: DataTypes.INTEGER,

    materials_cloth: DataTypes.INTEGER,
    materials_bones: DataTypes.INTEGER,
    materials_organs: DataTypes.INTEGER,
    materials_metal: DataTypes.INTEGER,

    potion_name: DataTypes.STRING,
    potion_value: DataTypes.INTEGER,
    potion_amount: DataTypes.INTEGER,

    bandage_name: DataTypes.STRING,
    bandage_value: DataTypes.INTEGER,
    bandage_amount: DataTypes.INTEGER,

    foot_name: DataTypes.STRING,
    food_value: DataTypes.INTEGER,
    food_amount: DataTypes.INTEGER
  }, {});

  Character.associate = function(models) {
    Character.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };
  
  return Character;
};