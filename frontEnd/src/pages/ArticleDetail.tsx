import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Clock, Trash, Pencil } from "lucide-react";
import { useArticles } from "@/contexts/ArticleContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import CommentList from "@/components/CommentList";
import { useAuth } from "@/contexts/AuthContext";
import CreateArticleForm from "@/components/CreateArticleForm";
import { Article } from "@/types";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getArticleById, toggleLike, isLiked, deleteArticle, editArticle } = useArticles();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const article = getArticleById(id || "");
  const liked = article ? isLiked(article.id) : false;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Article introuvable</h1>
        <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
      </div>
    );
  }

  const timestamp = Number(article.createdAt);
  const date = new Date(timestamp);

  const formattedDate = !isNaN(date.getTime())
    ? formatDistanceToNow(date, { addSuffix: true, locale: fr })
    : "Date invalide";

  const handleDelete = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: string, title: string, content: string) => {
    try {
      await editArticle(title, content, id);
      setIsEditing(false);
      navigate('/')
      return 
    } catch (error) {
      console.error(error);
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
        <Button
          variant="ghost"
          className="mb-4 -ml-2 flex items-center gap-1"
          onClick={() => setIsEditing(false)}
        >
          <ArrowLeft className="h-4 w-4" />
          Annuler
        </Button>
        <CreateArticleForm
          initialTitle={article.title}
          initialContent={article.content}
          onSubmitArticle={(title, content) => handleEdit(article.id, title, content)}
          submitLabel="Modifier"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-2 flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>

        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-3">Par {article.authorId}</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`flex items-center gap-2 ${liked ? "text-red-500 dark:text-red-400" : ""}`}
              onClick={() => toggleLike(article.id)}
            >
              <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
              <span>{article.likesCount}</span>
            </Button>

            {article.authorId === user.id && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(article.id)}
                >
                  <Trash className="text-red-700 dark:text-red-700" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="text-blue-500 dark:text-blue-400" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t">
        <CommentList articleId={article.id} comments={article.comments} />
      </div>
    </div>
  );
};

export default ArticleDetail;
