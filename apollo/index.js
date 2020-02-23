import { ApolloServer, gql } from 'apollo-server-micro';
import { verify } from 'jsonwebtoken';

import { graphDefs, resolvers } from './api';

const secret = process.env.SERVER_SECRET;

const Query = gql`
  type Query {
    _empty: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const server = new ApolloServer({
  typeDefs: [
    Query,
    ...graphDefs
  ],
  resolvers: {
    ...resolvers
  },
  context: async ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      if (token && token.split(' ')[0] !== 'Bearer') {
        throw new Error('Invalid Authorization Header');
      }
      const {
        accountId,
        userId,
        accType
      } = verify(token.split(' ')[1], secret[0]);
      return {
        accountId,
        userId,
        accType
      };
    }
    return null;
  },
  cors: true,
  playground: process.env.NODE_ENV !== 'production'
});

export default server;
