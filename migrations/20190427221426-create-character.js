'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      
      name: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },

      strength: {
        type: Sequelize.INTEGER
      },
      stamina: {
        type: Sequelize.INTEGER
      },
      agility: {
        type: Sequelize.INTEGER
      },

      weapons_left_class: {
        type: Sequelize.STRING
      },
      weapons_left_name: {
        type: Sequelize.STRING
      },
      weapons_left_damage_maximum: {
        type: Sequelize.INTEGER
      },
      weapons_left_damage_minimum: {
        type: Sequelize.INTEGER
      },
      weapons_left_critchance: {
        type: Sequelize.FLOAT
      },

      weapons_right_class: {
        type: Sequelize.STRING
      },
      weapons_right_name: {
        type: Sequelize.STRING
      },
      weapons_right_damage_maximum: {
        type: Sequelize.INTEGER
      },
      weapons_right_damage_minimum: {
        type: Sequelize.INTEGER
      },
      weapons_right_critchance: {
        type: Sequelize.FLOAT
      },

      armor_helmet: {
        type: Sequelize.INTEGER
      },
      armor_chest: {
        type: Sequelize.INTEGER
      },
      armor_pants: {
        type: Sequelize.INTEGER
      },
      armor_boots: {
        type: Sequelize.INTEGER
      },
      armor_gloves: {
        type: Sequelize.INTEGER
      },

      toy_name: {
        type: Sequelize.INTEGER
      },
      toy_value: {
        type: Sequelize.STRING
      },

      tools_cloth_name: {
        type: Sequelize.STRING
      },
      tools_cloth_value: {
        type: Sequelize.INTEGER
      },
      tools_bones_name: {
        type: Sequelize.STRING
      },
      tools_bones_value: {
        type: Sequelize.INTEGER
      },
      tools_organs_name: {
        type: Sequelize.STRING
      },
      tools_organs_value: {
        type: Sequelize.INTEGER
      },
      tools_metal_name: {
        type: Sequelize.STRING
      },
      tools_metal_value: {
        type: Sequelize.INTEGER
      },

      materials_cloth: {
        type: Sequelize.INTEGER
      },
      materials_bones: {
        type: Sequelize.INTEGER
      },
      materials_organs: {
        type: Sequelize.INTEGER
      },
      materials_metal: {
        type: Sequelize.INTEGER
      },

      potion_name: {
        type: Sequelize.STRING
      },
      potion_value: {
        type: Sequelize.INTEGER
      },
      potion_amount: {
        type: Sequelize.INTEGER
      },

      bandage_name: {
        type: Sequelize.STRING
      },
      bandage_value: {
        type: Sequelize.INTEGER
      },
      bandage_amount: {
        type: Sequelize.INTEGER
      },

      foot_name: {
        type: Sequelize.STRING
      },
      food_value: {
        type: Sequelize.INTEGER
      },
      food_amount: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Characters');
  }
};