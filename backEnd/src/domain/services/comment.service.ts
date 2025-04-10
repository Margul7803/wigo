import { PrismaArticleRepository } from '../../infrastructure/database/repositories/article.repository';
import { PrismaCommentRepository } from '../../infrastructure/database/repositories/comment.repository';

export class CommentService {
    private commentRepository: PrismaCommentRepository; 
    private articleRepository: PrismaArticleRepository;   

    constructor(commentRepository: PrismaCommentRepository, articleRepository: PrismaArticleRepository) {
      this.commentRepository = commentRepository;
      this.articleRepository = articleRepository;
    }
    
    findByArticleId = async (articleId: string) => {
        const article = await this.articleRepository.findById(articleId);
        if (!article) throw new Error('Article not found');

        return await this.commentRepository.findByArticleId(articleId);
    };
    
    createComment = async (content: string, authorId: string, articleId: string) => {
        const article = await this.articleRepository.findById(articleId);
        if (!article) throw new Error('Article not found');

        return await this.commentRepository.create(content, authorId, articleId);
    };
}
