import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useArticles } from "@/contexts/ArticleContext";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Article } from "@/types";

interface CreateArticleFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmitArticle?: (title: string, content: string) => Promise<Article> | Promise<void>;
  onSuccess?: () => void;
  submitLabel?: string;
}

const CreateArticleForm = ({
  initialTitle = "",
  initialContent = "",
  onSubmitArticle,
  onSuccess,
  submitLabel = "Publier",
}: CreateArticleFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { createArticle } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmitArticle) {
        await onSubmitArticle(title, content); // Pour l'édition
      } else {
        await createArticle(title, content); // Création
      }

      if (onSuccess) {
        onSuccess();
      }

      toast.success(`Article ${onSubmitArticle ? "modifié" : "publié"} avec succès`);
      navigate("/");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{onSubmitArticle ? "Modifier l’article" : "Créer un nouvel article"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              placeholder="Titre de votre article"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Contenu
            </label>
            <Textarea
              id="content"
              placeholder="Contenu de votre article"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateArticleForm;
