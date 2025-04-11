
export interface User {
  id: string;
  username: string;
  email: string;
  postsCount: number;
  likesCount: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  content: string;
  createdAt: number;
}
