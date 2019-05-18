'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    currentCharacter: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Character)
  };
  
  return User;
};