import { MyContext } from '../context';
import { requireAuth } from '../../../utils/requireAuth';
import { createArticleService } from '../../../infrastructure/container';

const articleService = createArticleService();

export const articleResolvers = {
    Mutation: {
      postArticle: async (
        _: unknown,
        { title, content }: { title: string; content: string },
        context: MyContext
      ) => {
        requireAuth(context);

        const authorId = context.user!.id;
  
        const article = await articleService.createArticle(title, content, authorId);
        return article;
      },
      updateArticle: async (
        _: unknown,
        { title, content, id }: { title: string; content: string, id: string },
        context: MyContext
      ) => {
        requireAuth(context);

        const authorId = context.user!.id;
  
        const article = await articleService.updateArticle(id, title, content, authorId);
        return article;
      },
      deleteArticle: async (
        _: unknown,
        { id }: { id: string },
        context: MyContext
      ) => {
        requireAuth(context);

        const authorId = context.user!.id;
  
        const article = await articleService.deleteArticle(id, authorId);
        return article;
      },
    },
  };
