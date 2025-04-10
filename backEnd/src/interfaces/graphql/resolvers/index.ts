import { articleResolvers } from './article.resolver';
import { authResolvers } from './auth.resolver';
import { commentResolvers } from './comment.resolver';
import { userResolvers } from './user.resolver';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...articleResolvers.Query,
    ...commentResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...articleResolvers.Mutation,
    ...commentResolvers.Muration
  },
};
