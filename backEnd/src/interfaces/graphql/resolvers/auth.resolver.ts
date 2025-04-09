import { createAuthService } from "../../../infrastructure/container";

const authService = createAuthService();

export const authResolvers = {
  Mutation: {
    login: async (_: any, { username, password }: { username: string, password: string }) => {
      const generatedToken = await authService.authenticateUser(username, password)

      return generatedToken;
    },

    register: async (_: any, { username, password, email }: { username: string, password: string, email: string }) => {
      const user = await authService.registerUser(username, password, email)

      return `User ${user.username} created`;
    },
  }
};
