'use strict';

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    room: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    stamina: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    agility: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    weapons_left_class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weapons_left_name: {
      type: DataTypes.STRING,
      defaultValue: "left hand"
    },
    weapons_left_damage_maximum: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    weapons_left_damage_minimum: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    weapons_left_critchance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.1
    },

    weapons_right_class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weapons_right_name: {
      type: DataTypes.STRING,
      defaultValue: "right hand"
    },
    weapons_right_damage_maximum: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    weapons_right_damage_minimum: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    weapons_right_critchance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.1
    },

    armor_helmet: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    armor_chest: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    armor_pants: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    armor_boots: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    armor_gloves: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    toy_name: DataTypes.STRING,
    toy_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    tools_cloth_name: DataTypes.STRING,
    tools_cloth_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tools_bones_name: DataTypes.STRING,
    tools_bones_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tools_organs_name: DataTypes.STRING,
    tools_organs_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tools_metal_name: DataTypes.STRING,
    tools_metal_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    materials_cloth: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    materials_bones: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    materials_organs: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    materials_metal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    potion_name: {
      type: DataTypes.STRING,
      defaultValue: "basic potion"
    },
    potion_value: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    potion_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },

    bandage_name: {
      type: DataTypes.STRING,
      defaultValue: "basic bandage"
    },
    bandage_value: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    bandage_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },

    foot_name: {
      type: DataTypes.STRING,
      defaultValue: "apple"
    },
    food_value: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    food_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    }
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