import { PrismaArticleRepository } from '../../infrastructure/database/repositories/article.repository';
import { AuthorizationError } from '../../interfaces/graphql/errors/auth.error';

export class ArticleService {
    private articleRepository: PrismaArticleRepository;   

    constructor(articleRepository: PrismaArticleRepository) {
      this.articleRepository = articleRepository;
    }
    
    findById = async (id: string) => {
        return await this.articleRepository.findById(id);
    };

    createArticle = async (title: string, content: string, authorId: string) => {
        return await this.articleRepository.create(title, content, authorId);
    };

    updateArticle = async (id: string, title: string, content: string, authorId: string) => {
        const article = await this.articleRepository.findById(id);

        if (!article) throw new Error('Article not found');
        if (article?.authorId !== authorId) throw new AuthorizationError('You are not the article auhtor')
        return await this.articleRepository.update(id, title, content);
    };

    deleteArticle = async (id: string, authorId: string): Promise<boolean> => {
        const article = await this.articleRepository.findById(id);

        if (!article) throw new Error('Article not found');
        if (article?.authorId !== authorId) throw new AuthorizationError('You are not the article auhtor')
        return await this.articleRepository.delete(id);
    };
}
