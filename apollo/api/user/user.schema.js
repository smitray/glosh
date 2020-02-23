import { gql } from 'apollo-server-micro';

const userDefs = gql`

  type User {
    _id: String,
    name: String,
    # avatar: File,
    # location: String,
    dob: DateTime,
    account: Account,
    createdAt: DateTime
  }

  extend type Query {
    users: [User],
    user(
      _id: String!
    ): User
  }

  extend type Mutation {
    userCreate(
      location: String,
      dob: DateTime
    ): User
    userUpdate(
      _id: String!,
      location: String,
      dob: DateTime,
      avatar: String
    ): User
    userDelete(
      _id: String!
    ): User
  }

`;

export default userDefs;
