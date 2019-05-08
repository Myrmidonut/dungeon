const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type UserWithCharacter {
    id: Int
    username: String
    email: String
    characterName: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): UserWithCharacter
  }
`)

module.exports = schema