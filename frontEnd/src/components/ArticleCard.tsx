
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Clock } from "lucide-react";
import { Article } from "@/types";
import { useArticles } from "@/contexts/ArticleContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { toggleLike, isLiked } = useArticles();
  const navigate = useNavigate();
  const liked = isLiked(article.id);
  
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
  
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };
  
  return (
    <Card className="card-hover overflow-hidden animate-fadeIn">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle 
            className="text-xl hover:text-primary cursor-pointer transition-colors"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            {article.title}
          </CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">{article.authorId}</span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formattedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent 
        className="pb-2 cursor-pointer" 
        onClick={() => navigate(`/article/${article.id}`)}
      >
        <p className="text-muted-foreground">
          {truncateContent(article.content)}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 ${liked ? "text-red-500 dark:text-red-400" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(article.id);
            }}
          >
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
            <span>{article.likesCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{article.commentsCount}</span>
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/article/${article.id}`)}
        >
          Lire la suite
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
