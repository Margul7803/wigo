import { MyContext } from '../context';
import { requireAuth } from '../../../utils/requireAuth';
import { createCommentService } from '../../../infrastructure/container';

const commentService = createCommentService();

export const commentResolvers = {
    Query: {
      getComments: async (
        _: unknown,
        { articleId }: { articleId: string },
        context: MyContext
      ) => {
        requireAuth(context);
  
        const user = await commentService.findByArticleId(articleId);
        return user;
      },
    },
    Muration: {
      addComment: async (
        _: unknown,
        { content, articleId }: { content: string, articleId: string },
        context: MyContext
      ) => {
        requireAuth(context);
        
        const authorId = context.user!.id;

        const user = await commentService.createComment(content, authorId, articleId);
        return user;
      },
    },
  };
