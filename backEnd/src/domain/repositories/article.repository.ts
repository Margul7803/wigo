import { Article } from '../entities/Article';

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  create(title: string, content: string, authorId: string): Promise<Article>;
  update(title: string, content: string, authorId: string): Promise<Article>;
  delete(id: string): Promise<boolean>;
}
