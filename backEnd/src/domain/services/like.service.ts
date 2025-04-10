import { PrismaArticleRepository } from '../../infrastructure/database/repositories/article.repository';
import { PrismaLikeRepository } from '../../infrastructure/database/repositories/like.repository';

export class LikeService {
    private likeRepository: PrismaLikeRepository; 
    private articleRepository: PrismaArticleRepository;   

    constructor(likeRepository: PrismaLikeRepository, articleRepository: PrismaArticleRepository) {
      this.likeRepository = likeRepository;
      this.articleRepository = articleRepository;
    }
    
    findByArticleId = async (articleId: string) => {
        const article = await this.articleRepository.findById(articleId);
        if (!article) throw new Error('Article not found');

        return await this.likeRepository.findByArticleId(articleId);
    };
    
    addLike = async (userId: string, articleId: string) => {
        const article = await this.articleRepository.findById(articleId);
        if (!article) throw new Error('Article not found');

        return await this.likeRepository.create(userId, articleId);
    };

    removeLike = async (userId: string, articleId: string) => {
        const article = await this.articleRepository.findById(articleId);
        if (!article) throw new Error('Article not found');

        return await this.likeRepository.delete(userId, articleId);
    };
}
