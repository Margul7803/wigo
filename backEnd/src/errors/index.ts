import { GraphQLError, GraphQLFormattedError } from "graphql";

import { AuthenticationError, AuthorizationError } from "../errors/auth.error";
import { isOriginalErrorInstanceOf } from "../utils/errorHandler";

export const formatError = (
    formattedError: GraphQLFormattedError,
    error: unknown
  ): GraphQLFormattedError => {
    if (isOriginalErrorInstanceOf(error, AuthenticationError)) {
      const originalError = (error as GraphQLError).originalError as AuthenticationError;
    
      return {
        ...formattedError,
        message: originalError.message,
        extensions: {
          ...formattedError.extensions,
          code: 'AUTHENTICATION_ERROR',
        },
      };
    }

    if (isOriginalErrorInstanceOf(error, AuthorizationError)) {
        const originalError = (error as GraphQLError).originalError as AuthorizationError;
      
        return {
          ...formattedError,
          message: originalError.message,
          extensions: {
            ...formattedError.extensions,
            code: 'AUTHORIZATION_ERROR',
          },
        };
      }
  
    return {
      ...formattedError,
      message: 'An internal server error occurred.',
      extensions: {
        ...formattedError.extensions,
        code: 'INTERNAL_SERVER_ERROR',
      },
    };
  };