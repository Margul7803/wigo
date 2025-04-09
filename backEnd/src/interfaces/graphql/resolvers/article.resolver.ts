import { MyContext } from '../context';
import { requireAuth } from '../../../utils/requireAuth';
import { createArticleService } from '../../../infrastructure/container';

const articleService = createArticleService();

export const articleResolvers = {
    Query: {
      getArticles: async (
        _: unknown,
        { authorId, titleContains, limit, offset }: { authorId?: string; titleContains?: string; limit?: number; offset?: number; },
        context: MyContext
      ) => {
        requireAuth(context);

        const articles = await articleService.findMany({ authorId, titleContains }, { limit, offset });
        return articles;
      },
      getArticle: async (
        _: unknown,
        { id }: { id: string },
        context: MyContext
      ) => {
        requireAuth(context);

        const article = await articleService.findById(id);
        return article;
      },
    },
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
