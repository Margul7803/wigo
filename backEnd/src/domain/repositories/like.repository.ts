import { Like } from '../entities/Like';

export interface LikeRepository {
  findByArticleId(id: string): Promise<Like[]>;
  findByUserAndArticle(userId: string, articleId: string): Promise<boolean>;
  create(userId: string, articleId: string): Promise<boolean>;
  delete(userId: string, articleId: string): Promise<boolean>;
}
