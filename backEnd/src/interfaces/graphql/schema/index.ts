import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './userTypeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs]);
