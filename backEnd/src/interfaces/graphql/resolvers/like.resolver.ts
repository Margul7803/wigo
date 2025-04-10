import { MyContext } from '../context';
import { requireAuth } from '../../../utils/requireAuth';
import { createLikeService } from '../../../infrastructure/container';

const likeService = createLikeService();

export const likeResolvers = {
    Query: {
      getLikes: async (
        _: unknown,
        { articleId }: { articleId: string },
        context: MyContext
      ) => {
        requireAuth(context);
  
        const user = await likeService.findByArticleId(articleId);
        return user;
      },
    },
    Muration: {
      addLike: async (
        _: unknown,
        { articleId }: { articleId: string },
        context: MyContext
      ) => {
        requireAuth(context);
        
        const userId = context.user!.id;

        const user = await likeService.addLike(userId, articleId);
        return user;
      },
      removeLike: async (
        _: unknown,
        { articleId }: { articleId: string },
        context: MyContext
      ) => {
        requireAuth(context);
        
        const userId = context.user!.id;

        const user = await likeService.removeLike(userId, articleId);
        return user;
      },
    },
  };
