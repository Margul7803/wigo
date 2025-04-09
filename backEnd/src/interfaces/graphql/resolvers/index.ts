import { articleResolvers } from './article.resolver';
import { authResolvers } from './auth.resolver';
import { userResolvers } from './user.resolver';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...articleResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...articleResolvers.Mutation,
  },
};
