import { MyContext } from '../context';
import { UserService } from '../services/user.service';
import { requireAuth } from '../utils/requireAuth';

const userService = new UserService();

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
