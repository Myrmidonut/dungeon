const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const { User, Character } = require('../models');

const root = {
  async me(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    const user = await User.findByPk(req.user.id);
    
    return user;
  },

  async signup({ username, email, password }, { req, res }) {
    const old_user = await User.findOne({ where: { email } });

    if (old_user) throw new Error('Email already registered.');

    const user = await User.create(
      {
        username,
        email,
        password: await bcrypt.hash(password, 10)
      }
    );

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token", token);

    return user.username;
  },

  async login({ email, password }, { req, res }) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('No user with that email.');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error('Incorrect password.');

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token", token);

    // character test

    const characterClass = "paladin";

    await Character.create({ UserId: user.id, name: "jim", class: characterClass, weapons_left_class: characterClass, weapons_right_class: characterClass });

    const character = await Character.findOne({ where: { UserId: user.id }});
    const characters = await Character.findAll();

    user.characterName = character.name
    user.characters = characters

    // end test

    return user
  }
}

module.exports = root