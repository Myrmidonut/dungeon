const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type User {
    id: Int
    username: String!
    email: String
    characters: [Character]!
  }

  type Character {
    name: String!
    class: String!
    level: Int!
    id: Int!
  }

  type Player {
    name: String
    class: String
    level: Int
  }

  type Query {
    me: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): User
    create_character (name: String!, character_class: String!): Player
    select_character (id: Int!): Player
    next_room (id: Int!): Player
  }
`)

module.exports = schema