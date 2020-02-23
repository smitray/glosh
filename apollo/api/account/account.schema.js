import { gql } from 'apollo-server-micro';

const accountDefs = gql`

  type Account {
    _id: String,
    username: String,
    email: String,
    phone: String,
    status: String,
    accType: String,
    token: String,
    user: User
  }

  extend type Query {
    accounts(accType: String): [Account],
    account(_id: String!): Account
  }

  type Mutation {
    accountCreate(
      name: String!,
      username: String,
      email: String,
      phone: String,
      password: String!
      accType: String
    ): Account
    accountUpdate(
      _id: String!
      username: String,
      email: String,
      phone: String,
      password: String
    ): Account
    accountDelete(
      _id: String!
    ): Account
    accountLogin(
      cred: String!,
      password: String!
    ): Account
  }

`;

export default accountDefs;
