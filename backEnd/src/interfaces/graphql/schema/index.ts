import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './userTypeDefs';
import { articleTypeDefs } from './articleTypeDefs';
import { commentTypeDefs } from './commentTypeDefs';
import { likeTypeDefs } from './likeTypeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs, articleTypeDefs, commentTypeDefs, likeTypeDefs]);
