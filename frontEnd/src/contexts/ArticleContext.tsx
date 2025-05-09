import React, { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ARTICLES } from "../graphql/queries";
import { TOGGLE_LIKE, ADD_COMMENT, CREATE_ARTICLE, DELETE_ARTICLE, EDIT_ARTICLE } from "../graphql/mutations";
import { Article, Comment } from "@/types";

interface ArticleContextType {
  articles: Article[];
  getArticleById: (id: string) => Article | undefined;
  toggleLike: (articleId: string) => void;
  addComment: (articleId: string, content: string) => void;
  isLiked: (articleId: string) => boolean;
  createArticle: (title: string, content: string) => Promise<Article>;
  deleteArticle: (articleId: string) => Promise<boolean>;
  editArticle: (title: string, content: string, articleId: string) => Promise<Article>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const { data: articlesData, fetchMore, refetch } = useQuery(GET_ARTICLES, {
    variables: { offset: 0, limit: 10 },
    fetchPolicy: "cache-and-network",
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
  const [createArticleMutation] = useMutation(CREATE_ARTICLE);
  const [deleteArticleMutation] = useMutation(DELETE_ARTICLE);
  const [editArticleMutation] = useMutation(EDIT_ARTICLE);


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
      onCompleted: (data) => {
        if (data?.toggleLike) {
          refetch();
          toast.success("Like ajouté !");
        } else {
          refetch();
          toast.success("Like retiré !");
        }
      },
    });
  };

  const isLiked = (articleId: string): boolean => {
    if (!user) return false;

    const article = articlesData?.getArticles.find((a: Article) => a.id === articleId);

    return article.likes.some((like) => like.userId === user.id) ?? false;
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
      onCompleted: () => {
        refetch();
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
    });
    if (data?.postArticle) {
      toast.success("Article créé avec succès");
      refetch();
      return data.postArticle;
    } else {
      toast.error("Une erreur est survenue lors de la création de l'article");
      throw new Error("Error creating article");
    }
  };

  const deleteArticle = async (articleId: string): Promise<boolean> => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un article");
      throw new Error("User not authenticated");
    }

    const { data } = await deleteArticleMutation({
      variables: { articleId },
    });
    if (data?.deleteArticle) {
      toast.success("Article supprimer avec succès");
      refetch();
      return true;
    } else {
      toast.error("Une erreur est survenue lors de la supression de l'article");
      throw new Error("Error creating article");
    }
  };

  const editArticle = async (title: string, content: string, articleId: string): Promise<Article> => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un article");
      throw new Error("User not authenticated");
    }

    const { data } = await editArticleMutation({
      variables: { title, content, articleId },
      refetchQueries: [{ query: GET_ARTICLES }],
    });
    if (data?.postArticle) {
      toast.success("Article modifier avec succès");
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
        deleteArticle,
        editArticle,
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
