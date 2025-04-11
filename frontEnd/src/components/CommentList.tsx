
import { useState } from "react";
import { Comment } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/contexts/ArticleContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Send } from "lucide-react";

interface CommentListProps {
  articleId: string;
  comments: Comment[];
}

const CommentList = ({ articleId, comments }: CommentListProps) => {
  const [newComment, setNewComment] = useState("");
  const { addComment } = useArticles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addComment(articleId, newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Commentaires ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!newComment.trim()}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            Envoyer
          </Button>
        </div>
      </form>
      
      <div className="space-y-4">
        {comments.length > 0 ? (
          [...comments]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 animate-fadeIn">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{comment.authorId}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Aucun commentaire pour le moment. Soyez le premier à réagir !
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
