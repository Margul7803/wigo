import { authResolvers } from './auth.resolver';
import { userResolvers } from './user.resolver';

export const resolvers = {
  Query: {
    ...userResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};
