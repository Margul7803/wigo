import { useState } from "react";
import { Link } from "react-router-dom";
import { useArticles } from "@/contexts/ArticleContext";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";

const Home = () => {
  const { articles } = useArticles();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [groupByAuthor, setGroupByAuthor] = useState(false);

  // Tri
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortOrder === "asc") return a.likesCount - b.likesCount;
    if (sortOrder === "desc") return b.likesCount - a.likesCount;
    return 0;
  });

  // Regroupement par auteur
  const articlesGroupedByAuthor = groupByAuthor
    ? sortedArticles.reduce((acc, article) => {
        const author = article.authorName || "Inconnu";
        if (!acc[author]) acc[author] = [];
        acc[author].push(article);
        return acc;
      }, {} as Record<string, typeof articles>)
    : null;

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

     <div className="flex flex-col md:flex-row gap-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
          className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Trier par likes</option>
          <option value="asc">Likes (croissant)</option>
          <option value="desc">Likes (décroissant)</option>
        </select>

        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={groupByAuthor}
            onChange={() => setGroupByAuthor(!groupByAuthor)}
          />
          Regrouper par auteur
        </label>
      </div>

      {/* Affichage des articles */}
      {groupByAuthor ? (
        <div className="space-y-8">
          {Object.entries(articlesGroupedByAuthor!).map(([author, articles]) => (
            <div key={author}>
              <h2 className="text-xl font-semibold mb-4">{author}</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
