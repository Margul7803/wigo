// src/utils/isOriginalErrorInstanceOf.ts
import { GraphQLError } from 'graphql';

/**
 * Vérifie si l'erreur originale (originalError) d'un GraphQLError
 * est une instance d'une classe d'erreur spécifique.
 */
export function isOriginalErrorInstanceOf<T>(
  error: unknown,
  errorType: new (...args: any[]) => T
): error is GraphQLError {
  return (
    error instanceof GraphQLError &&
    error.originalError instanceof errorType
  );
}
