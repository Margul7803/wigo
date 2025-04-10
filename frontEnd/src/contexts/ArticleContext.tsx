import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { Article, Comment } from "@/types";
import { useAuth } from "./AuthContext";

interface ArticleContextType {
  articles: Article[];
  getArticleById: (id: string) => Article | undefined;
  getArticleComments: (articleId: string) => Comment[];
  toggleLike: (articleId: string) => void;
  addComment: (articleId: string, content: string) => void;
  isLiked: (articleId: string) => boolean;
  createArticle: (title: string, content: string) => Promise<Article>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

// Mock data for demonstration
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Bienvenue sur Wigo!",
    content: "Wigo (What Is Going On) est une plateforme de partage d'articles et d'idées. N'hésitez pas à interagir avec la communauté en aimant les articles et en laissant des commentaires!",
    authorId: "1",
    authorName: "demouser",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    likes: ["2", "3"],
    commentsCount: 2,
  },
  {
    id: "2",
    title: "Les avantages de React",
    content: "React est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur interactives. Elle utilise un DOM virtuel pour optimiser les performances et offre une approche basée sur les composants.",
    authorId: "2",
    authorName: "reactfan",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: ["1"],
    commentsCount: 1,
  },
  {
    id: "3",
    title: "Tailwind CSS: Le CSS utilitaire",
    content: "Tailwind CSS est un framework CSS qui vous permet de construire des designs personnalisés sans jamais quitter votre HTML. Contrairement à Bootstrap ou Foundation, Tailwind n'a pas de composants prédéfinis.",
    authorId: "3",
    authorName: "cssmaster",
    createdAt: new Date().toISOString(),
    likes: [],
    commentsCount: 0,
  }
];

const mockComments: Comment[] = [
  {
    id: "1",
    articleId: "1",
    authorId: "2",
    authorName: "reactfan",
    content: "Super plateforme! J'adore le design.",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "2",
    articleId: "1",
    authorId: "3",
    authorName: "cssmaster",
    content: "Très intuitif et facile à utiliser.",
    createdAt: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: "3",
    articleId: "2",
    authorId: "1",
    authorName: "demouser",
    content: "J'utilise React depuis des années et je ne peux plus m'en passer!",
    createdAt: new Date(Date.now() - 32400000).toISOString(),
  },
];

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const getArticleById = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  const getArticleComments = (articleId: string) => {
    return comments.filter((comment) => comment.articleId === articleId);
  };

  const toggleLike = (articleId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour aimer un article");
      return;
    }

    setArticles((prev) =>
      prev.map((article) => {
        if (article.id === articleId) {
          const isLiked = article.likes.includes(user.id);
          
          if (isLiked) {
            return {
              ...article,
              likes: article.likes.filter((id) => id !== user.id),
            };
          } else {
            return {
              ...article,
              likes: [...article.likes, user.id],
            };
          }
        }
        return article;
      })
    );
  };

  const isLiked = (articleId: string): boolean => {
    if (!user) return false;
    const article = articles.find((a) => a.id === articleId);
    return article ? article.likes.includes(user.id) : false;
  };

  const addComment = (articleId: string, content: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour commenter");
      return;
    }

    if (!content.trim()) {
      toast.error("Le commentaire ne peut pas être vide");
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      articleId,
      authorId: user.id,
      authorName: user.username,
      content,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    
    setArticles((prev) =>
      prev.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            commentsCount: article.commentsCount + 1,
          };
        }
        return article;
      })
    );

    toast.success("Commentaire ajouté");
  };

  const createArticle = async (title: string, content: string): Promise<Article> => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un article");
      throw new Error("User not authenticated");
    }

    const newArticle: Article = {
      id: `article-${Date.now()}`,
      title,
      content,
      authorId: user.id,
      authorName: user.username,
      createdAt: new Date().toISOString(),
      likes: [],
      commentsCount: 0,
    };

    await new Promise(resolve => setTimeout(resolve, 300));

    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        getArticleById,
        getArticleComments,
        toggleLike,
        addComment,
        isLiked,
        createArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error("useArticles must be used within an ArticleProvider");
  }
  return context;
};
