import { GraphQLError } from 'graphql';

export function isOriginalErrorInstanceOf<T>(
  error: unknown,
  errorType: new (...args: any[]) => T
): error is GraphQLError {
  return (
    error instanceof GraphQLError &&
    error.originalError instanceof errorType
  );
}
