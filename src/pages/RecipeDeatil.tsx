import {  useParams } from "react-router-dom";
import { RecipesDetailsHero } from "@/features/recipes/components/detail/RecipesDetailHero";
import { RecipesDetailStats } from "@/features/recipes/components/detail/RecipesDetailStats";
import { RecipesDetailsInstruction } from "@/features/recipes/components/detail/RecipesDetailInstruction";
import { useState } from "react";
import { RecipesReview } from "@/features/recipes/components/detail/RecipesReview";
import { useGetRecipeDetail } from "@/api/useRecipes";

function RecipeDetail() {
  const { recipeId } = useParams();
  const [serving, setServing] = useState(1);
  const id = Number(recipeId);

  const { data: recipe, isLoading, isError } = useGetRecipeDetail(id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }
  const increaseServing = () => {
    setServing((prev) => prev + 1);
  };

  const decreaseServing = () => {
    setServing((prev) => Math.max(1, prev - 1));
  };

  const changeServing = (value: number) => {
    setServing(value);
  };

  return (
    <div className="container mx-auto">
      <section className="mx-auto max-w-6xl py-8 space-y-2 md:space-y-4 px-3 md:px-4">
        {isLoading ? (
          <p>Loading recipes…</p>
        ) : isError ? (
          <p>Unable to load recipes. Please try again.</p>
        ) : (
          <>
            <RecipesDetailsHero recipe={recipe} />
            <RecipesDetailStats
              prepTime={recipe.prepTime}
              cookTime={recipe.cookingTime}
              servings={recipe.servings}
            />
            <RecipesDetailsInstruction
              serving={serving}
              recipe={recipe}
              onIncrease={increaseServing}
              onDecrease={decreaseServing}
              onServingChange={changeServing}
            />

            <RecipesReview reviews={recipe.reviews ?? []} />
          </>
        )}
      </section>
    </div>
  );
}

export default RecipeDetail;
