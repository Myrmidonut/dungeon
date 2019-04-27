'use strict';

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    level: DataTypes.INTEGER,
    stats: DataTypes.STRING,
    weapon: DataTypes.STRING,
    armor: DataTypes.STRING,
    backpack: DataTypes.STRING
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