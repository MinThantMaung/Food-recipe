import { FoodCard } from "@/utils/FoodCard";
import { recipes } from "@/utils/items";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FoodRecommendation = () => {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Qucik & delicious
          </h2>
          <div className="text-sm text-gray-400">
            Good food, ready in 30minutes or less
          </div>
        </div>

        <Link
          to="/recipes"
          className="group inline-flex shrink-0 items-center gap-2
      text-sm font-medium text-gray-600
      transition-colors duration-200
      hover:text-orange-500
      focus-visible:rounded-sm
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-orange-500"
        >
          <span>View all</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {recipes.map((recipe) => (
          <FoodCard
            key={recipe.cuisine}
            title={recipe.title}
            image={recipe.image}
            to={`/recipes/${recipe.id}`}
            duration={recipe.duration}
            cuisine={recipe.cuisine}
            rating={recipe.rating}
            reviewCount={recipe.reviewCount}
          />
        ))}
      </div>
    </section>
  );
};
