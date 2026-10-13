import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";
import { useGetCuisines, useGetMeals, useGetRecipesCardList } from "@/api/useRecipes";

function Home() {
  const { data: recipes = [], isLoading, isError } = useGetRecipesCardList();
  const { data: cuisines = [], isLoading: cuisineLoading,isError: cuisineError } = useGetCuisines();
  const { data: meals = [], isLoading: mealLoading,isError: mealError} = useGetMeals();
  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />
      {mealLoading ? (
        <p>Loading recipes…</p>
      ) : mealError ? (
        <p>Unable to load recipes. Please try again.</p>
      ) : (
        <MealCategories meals = {meals}/>
      )}
      

      {isLoading ? (
        <p>Loading recipes…</p>
      ) : isError ? (
        <p>Unable to load recipes. Please try again.</p>
      ) : (
        <FoodRecommendation recipes={recipes} />
      )}

      {cuisineLoading ? (
        <p>Loading recipes…</p>
      ) : cuisineError ? (
        <p>Unable to load cuisines. Please try again.</p>
      ) : (
        <CuisineCategories cuisines={cuisines} />
      )}
    </div>
  );
}

export default Home;
