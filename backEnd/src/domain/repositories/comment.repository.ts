import { Comment } from '../entities/Comment';

export interface CommentRepository {
  findByArticleId(articleId: string): Promise<Comment[]>;
  create(content: string, authorId: string, articleId: string): Promise<Comment>;
}
