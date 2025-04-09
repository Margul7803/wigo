import { MyContext } from '../interfaces/graphql/context';
import { AuthorizationError } from '../interfaces/graphql/errors/auth.error';

export function requireAuth(context: MyContext) {
  if (!context.user) {
    throw new AuthorizationError('Unauthorized ressources')
  }
  return context.user;
}
