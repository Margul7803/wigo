import { AuthService } from '../domain/services/auth.service';
import { UserService } from '../domain/services/user.service';
import { ArticleService } from '../domain/services/article.service';
import { PrismaUserRepository } from './database/repositories/user.repository';
import { PrismaArticleRepository } from './database/repositories/article.repository';


export const createAuthService = () => {
  const userRepository = new PrismaUserRepository();
  return new AuthService(userRepository);
};

export const createUserService = () => {
  const userRepository = new PrismaUserRepository();
  return new UserService(userRepository);
};

export const createArticleService = () => {
  const articleRepository = new PrismaArticleRepository();
  return new ArticleService(articleRepository);
};