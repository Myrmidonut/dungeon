'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weapon = sequelize.define('Weapon', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    damage: DataTypes.INTEGER,
    bonus: DataTypes.STRING
  }, {});
  Weapon.associate = function(models) {
    // associations can be defined here
  };
  return Weapon;
};