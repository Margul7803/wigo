import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './userTypeDefs';
import { articleTypeDefs } from './articleTypeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs, articleTypeDefs]);
