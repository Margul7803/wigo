import { AuthService } from '../domain/services/auth.service';
import { UserService } from '../domain/services/user.service';
import { ArticleService } from '../domain/services/article.service';
import { CommentService } from '../domain/services/comment.service';
import { LikeService } from '../domain/services/like.service';

import { PrismaUserRepository } from './database/repositories/user.repository';
import { PrismaArticleRepository } from './database/repositories/article.repository';
import { PrismaCommentRepository } from './database/repositories/comment.repository';
import { PrismaLikeRepository } from './database/repositories/like.repository';



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

export const createCommentService = () => {
  const commentRepository = new PrismaCommentRepository();
  const articleRepository = new PrismaArticleRepository();
  return new CommentService(commentRepository, articleRepository);
};

export const createLikeService = () => {
  const likeRepository = new PrismaLikeRepository();
  const articleRepository = new PrismaArticleRepository();
  return new LikeService(likeRepository, articleRepository);
};