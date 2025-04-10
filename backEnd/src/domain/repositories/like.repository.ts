import { Like } from '../entities/Like';

export interface LikeRepository {
  findByArticleId(id: string): Promise<Like[]>;
  create(userId: string, articleId: string): Promise<boolean>;
  delete(userId: string, articleId: string): Promise<boolean>;
}
