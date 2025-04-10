
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticles } from "@/contexts/ArticleContext";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";

const Home = () => {
  const { articles } = useArticles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fil d'actualité</h1>
        <Link to="/create-article">
          <Button className="flex items-center gap-2">
            <PenIcon size={18} />
            Poster un article
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
