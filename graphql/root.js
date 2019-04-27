const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const { User } = require('../models')

const root = {
  async me(args, { req, res }) {
    //console.log(req.headers)
    console.log(req.user)

    if (!req.user) {
      throw new Error('You are not authenticated.')
    }

    return await User.findByPk(req.user.id)
  },

  async signup({ username, email, password }, { req, res }) {
    const old_user = await User.findOne({ where: { email } })

    if (old_user) {
      throw new Error('Email already registered.')
    }

    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    })

    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie("token", token)

    return user.username
  },

  async login({ email, password }, { req, res }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('No user with that email.')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error('Incorrect password.')
    }

    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie("token", token)

    return user.username
  }
}

module.exports = root