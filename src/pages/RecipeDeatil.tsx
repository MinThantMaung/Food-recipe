import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { recipesDetailLoader } from "@/router/loader";

import { RecipesDetailsHero } from "@/features/recipes/components/detail/RecipesDetailHero";
import { RecipesDetailStats } from "@/features/recipes/components/detail/RecipesDetailStats";
import { RecipesDetailsInstruction } from "@/features/recipes/components/detail/RecipesDetailInstruction";
import { RecipesReview } from "@/features/recipes/components/detail/RecipesReview";

function RecipeDetail() {
  const recipe = useLoaderData() as Awaited<
    ReturnType<typeof recipesDetailLoader>
  >;

  const [serving, setServing] = useState(1);

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
      <section className="mx-auto max-w-6xl space-y-2 px-3 py-8 md:space-y-4 md:px-4">
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

        <RecipesReview
          recipeId={recipe.id}
          reviews={recipe.reviews ?? []}
        />
      </section>
    </div>
  );
}

export default RecipeDetail;