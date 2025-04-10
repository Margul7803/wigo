
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
  createdAt: string;
  likes: string[];
  commentsCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
