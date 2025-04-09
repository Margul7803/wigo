import { GraphQLError } from 'graphql';
import { MyContext } from '../context';
import { AuthorizationError } from '../errors/auth.error';

export function requireAuth(context: MyContext) {
  if (!context.user) {
    throw new AuthorizationError('Unauthorized ressources')
  }
  return context.user;
}
