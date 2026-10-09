import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";
import { useGetRecipesCardList } from "@/api/useRecipes";

function Home() {
  const { data: recipes = [], isLoading, isError } = useGetRecipesCardList();
  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />
      <MealCategories />

      {isLoading ? (
        <p>Loading recipes…</p>
      ) : isError ? (
        <p>Unable to load recipes. Please try again.</p>
      ) : (
        <FoodRecommendation recipes={recipes} />
      )}

      <CuisineCategories />
    </div>
  );
}

export default Home;
