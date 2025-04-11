
import CreateArticleForm from "@/components/CreateArticleForm";
import { useArticles } from "@/contexts/ArticleContext";
import { Article } from "@/types";

const UpdateArticle = (article: Article) => {
  const { editArticle } = useArticles();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Poster un article</h1>
      <CreateArticleForm
        initialTitle={article.title}
        initialContent={article.content}
        submitLabel="Modifier"
        onSubmitArticle={(title, content) => editArticle(title, content)}
        onSuccess={() => console.log("Article modifié !")}
      />
    </div>
  );
};

export default UpdateArticle;
