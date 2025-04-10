
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Clock } from "lucide-react";
import { useArticles } from "@/contexts/ArticleContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import CommentList from "@/components/CommentList";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById, toggleLike, isLiked } = useArticles();
  
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

  let formattedDate = "Date invalide";

  if (!isNaN(date.getTime())) {
    formattedDate = formatDistanceToNow(date, {
      addSuffix: true,
      locale: fr,
    });
  } else {
    console.warn("Date invalide:", article.createdAt);
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
            <span className="mr-3">Par {article.authorName}</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-2 ${liked ? "text-red-500 dark:text-red-400" : ""}`}
            onClick={() => toggleLike(article.id)}
          >
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
            <span>{article.likesCount}</span>
          </Button>
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
