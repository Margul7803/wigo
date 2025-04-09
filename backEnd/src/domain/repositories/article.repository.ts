import { Article } from '../entities/Article';

type ArticleFilters = {
  authorId?: string;
  titleContains?: string;
};

type Pagination = {
  limit?: number;
  offset?: number;
};

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  findMany(filters?: ArticleFilters, pagination?: Pagination): Promise<Article[]>;
  create(title: string, content: string, authorId: string): Promise<Article>;
  update(title: string, content: string, authorId: string): Promise<Article>;
  delete(id: string): Promise<boolean>;
}
