import { useState } from "react";
import { ProfileBanner } from "@/features/recipes/components/ProfileBanner";
import { Link, useLoaderData } from "react-router-dom";
import banner from "../assets/profileBanner.png";
import { RecipeSearch } from "@/features/recipes/components/RecipeSearch";
import { ArrowRight, SearchX } from "lucide-react";
import { FoodCard, type FoodCardProps } from "@/utils/FoodCard";

type SavedRecipeData = Pick<
  FoodCardProps,
  | "title"
  | "image"
  | "prepTime"
  | "cookingTime"
  | "country"
  | "rating"
  | "reviewCount"
> & {
  id: number;
};

type SavedRecipeItem = {
  recipe: SavedRecipeData;
};

function SavedRecipe() {
  const savedRecipes = useLoaderData() as SavedRecipeItem[];

  const [recipes, setRecipes] = useState<SavedRecipeData[]>(() =>
    savedRecipes.map((saved) => saved.recipe)
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleUnsave = (recipeId: number) => {
    setRecipes((previous) =>
      previous.filter((recipe) => recipe.id !== recipeId),
    );
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(normalizedSearch),
  );

  return (
    <div className="mx-auto h-full min-h-0 w-full max-w-6xl px-4 sm:p-6 lg:p-8 space-y-4 md:space-y-8">
      <ProfileBanner
        title="Saved Recipes"
        imageUrl={banner}
        description="All your favorite recipes in one place, ready whenever inspiration strikes."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="w-full min-w-0 sm:max-w-xl [&>div]:mx-0 [&>div]:mb-0">
          <RecipeSearch value={searchQuery} onChange={handleSearchChange} />
        </div>

        <p className="shrink-0 whitespace-nowrap text-sm text-gray-500">
          {filteredRecipes.length}{" "}
          {filteredRecipes.length === 1 ? "recipe" : "recipes"}
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-orange-200 bg-white px-6 py-14 text-center sm:py-20">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-orange-50">
            <SearchX
              aria-hidden="true"
              className="size-7 text-orange-500"
              strokeWidth={1.5}
            />
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-gray-900">
            No recipes Saved
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            We couldn't find any saved recipes.
          </p>

          <Link
            to="/recipes"
            className="mt-6 inline-flex items-center gap-2 rounded-full
      bg-orange-500 px-5 py-2.5 text-sm font-medium text-white
      transition-colors hover:bg-orange-600
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-orange-500"
          >
            View Recipes
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-orange-200 bg-white px-6 py-14 text-center sm:py-20">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-orange-50">
            <SearchX
              aria-hidden="true"
              className="size-7 text-orange-500"
              strokeWidth={1.5}
            />
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-gray-900">
            No matching recipes
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            We couldn't find any saved recipes for{" "}
            <span className="font-medium wrap-break-words text-gray-700">
              “{searchQuery.trim()}”
            </span>
            . Try another name or explore your saved collection.
          </p>

          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-6 inline-flex items-center gap-2 rounded-full
      bg-orange-500 px-5 py-2.5 text-sm font-medium text-white
      transition-colors hover:bg-orange-600
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-orange-500"
          >
            View all saved recipes
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              recipeId={recipe.id}
              title={recipe.title}
              image={recipe.image}
              to={`/recipes/${recipe.id}`}
              prepTime={recipe.prepTime}
              cookingTime={recipe.cookingTime}
              country={recipe.country}
              rating={recipe.rating}
              reviewCount={recipe.reviewCount}
              onUnsave={handleUnsave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipe;
