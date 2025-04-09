import { MyContext } from '../context';
import { requireAuth } from '../../../utils/requireAuth';
import { createUserService } from '../../../infrastructure/container';

const userService = createUserService();

export const userResolvers = {
    Query: {
      getUser: async (
        _: unknown,
        { username }: { username: string },
        context: MyContext
      ) => {
        requireAuth(context);
  
        const user = await userService.findUserByUsername(username);
        return user;
      },
    },
  };
