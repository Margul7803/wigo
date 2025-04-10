import React, { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ARTICLES } from "../graphql/queries";
import { TOGGLE_LIKE, ADD_COMMENT, CREATE_ARTICLE } from "../graphql/mutations";
import { Article, Comment } from "@/types";

interface ArticleContextType {
  articles: Article[];
  getArticleById: (id: string) => Article | undefined;
  toggleLike: (articleId: string) => void;
  addComment: (articleId: string, content: string) => void;
  isLiked: (articleId: string) => boolean;
  createArticle: (title: string, content: string) => Promise<Article>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const { data: articlesData, fetchMore } = useQuery(GET_ARTICLES, {
    variables: { offset: 0, limit: 10 },
    fetchPolicy: "cache-and-network",
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
  const [createArticleMutation] = useMutation(CREATE_ARTICLE);

  const getArticleById = (id: string) => {
    return articlesData?.getArticles.find((article: Article) => article.id === id);
  };

  const toggleLike = (articleId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour aimer un article");
      return;
    }

    toggleLikeMutation({
      variables: { articleId, userId: user.id },
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: (data) => {
        console.log(data)
        if (data?.toggleLike) {
          toast.success("Like ajouté !");
        } else {
          toast.success("Like retiré !");
        }
      },
    });
  };

  const isLiked = (articleId: string): boolean => {
    if (!user) return false;

    const article = articlesData?.getArticles.find((a: Article) => a.id === articleId); // TODO fix me
    return article?.likedBy?.includes(user.id) ?? false;
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

    addCommentMutation({
      variables: { articleId, content, userId: user.id },
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: () => {
        toast.success("Commentaire ajouté");
      },
    });
  };

  const createArticle = async (title: string, content: string): Promise<Article> => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un article");
      throw new Error("User not authenticated");
    }

    const { data } = await createArticleMutation({
      variables: { title, content, authorId: user.id },
      refetchQueries: [{ query: GET_ARTICLES }],
    });
    if (data?.postArticle) {
      toast.success("Article créé avec succès");
      return data.postArticle;
    } else {
      toast.error("Une erreur est survenue lors de la création de l'article");
      throw new Error("Error creating article");
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles: articlesData?.getArticles || [],
        getArticleById,
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
