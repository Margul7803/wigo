import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './userTypeDefs';
import { articleTypeDefs } from './articleTypeDefs';
import { commentTypeDefs } from './commentTypeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs, articleTypeDefs, commentTypeDefs]);
