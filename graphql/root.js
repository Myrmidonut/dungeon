const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const gameValues = require("../game/values")
const gameFunctions = require("../game/functions")

const { User, Character } = require('../models');

const root = {
  async me(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    const user = await User.findByPk(req.user.id);
    
    return user;
  },

  async signup({ username, email, password }, { req, res }) {
    // findOrCreate

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

    const characters = await Character.findAll({ raw: true, where: { UserId: user.id }});
    
    user.characters = characters.map(e => {
      return {
        name: e.name,
        class: e.class,
        level: e.level,
        id: e.id
      }
    });

    return user;
  },

  async create_character(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    const character = await Character.create({ raw: true, UserId: req.user.id, name: args.name, class: args.character_class, weapons_left_class: args.character_class, weapons_right_class: args.character_class });
    const player = gameFunctions.createPlayer(character);

    return player;
  },

  async select_character(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    const character = await Character.findOne({ raw: true, where: {id: args.id, UserId: req.user.id} });
    if (!character) throw new Error('Character not found.');

    await User.update({currentCharacter: args.id}, {where: {id: req.user.id}})

    const player = gameFunctions.createPlayer(character);

    return player;
  },

  async play(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    // current character has to stay the same
    // room(player, gameValues)
    // returns result object

    const user = await User.findOne({ raw: true, where: {id: req.user.id} });

    // console.log(currentCharacterId)

    const character = await Character.findOne({ raw: true, where: {id: user.currentCharacter} });
    // if (!character) throw new Error('Character not found.');

    // needs a persistent copy of the character, probably in select_character?
    // copy resets if level is cleared
    // stays active if level still in progress

    const player = gameFunctions.createPlayer(character);
    const result = gameFunctions.room(player, gameValues);

    console.log(result)

    // { win: true, loot: null, message: 'room 0' }

    return result;
  },

  async scavenge(args, { req, res }) {
    if (!req.user) throw new Error('You are not authenticated.');

    const user = await User.findOne({ raw: true, where: {id: req.user.id} });
    const character = await Character.findOne({ raw: true, where: {id: user.currentCharacter} });

    return true;
  }
}

module.exports = root