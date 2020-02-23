import { merge } from 'lodash';
import {
  DateTimeScalar,
  DateTime
} from '@saeris/graphql-scalars';

/* INJECT_IMPORT */
import { userDefs, userResolvers } from './user';
import { accountDefs, accountResolvers } from './account';


const typeDefs = [
  /* INJECT_DEFS */
  userDefs,
  accountDefs
];

const resol = merge(
  /* INJECT_RESOLVERS */
  userResolvers,
  accountResolvers
);

export const resolvers = {
  ...resol,
  DateTime
};


export const graphDefs = [
  ...typeDefs,
  DateTimeScalar
];
