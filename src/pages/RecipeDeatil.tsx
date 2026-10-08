import { useParams } from "react-router-dom";
import { recipesItems } from "@/utils/items";
import { RecipesDetailsHero } from "@/features/recipes/components/detail/RecipesDetailHero";
import { RecipesDetailStats } from "@/features/recipes/components/detail/RecipesDetailStats";
import { RecipesDetailsInstruction } from "@/features/recipes/components/detail/RecipesDetailInstruction";
import { useState } from "react";
import { RecipesReview } from "@/features/recipes/components/detail/RecipesReview";

function RecipeDetail() {
  const { recipeId } = useParams();
  const [serving, setServing] = useState(1);
  const recipe = recipesItems.find((item) => item.id === Number(recipeId));

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
        <RecipesDetailsHero recipe={recipe} />
        <RecipesDetailStats
          prepTime={recipe.duration}
          cookTime={recipe.duration}
          servings={4}
        />
        <RecipesDetailsInstruction
          serving={serving}
          originalServing = {4}
          onIncrease={increaseServing}
          onDecrease={decreaseServing}
          onServingChange={changeServing}
        />

        <RecipesReview />
      </section>
    </div>
  );
}

export default RecipeDetail;
