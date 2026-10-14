import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";
import { useLoaderData } from "react-router-dom";
import type { homeLoader } from "@/router/loader";

function Home() {
   const { recipes, cuisines, meals } = useLoaderData() as Awaited<
    ReturnType<typeof homeLoader>
  >;
  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />
      <MealCategories meals={meals} />
      <FoodRecommendation recipes={recipes} />
      <CuisineCategories cuisines={cuisines} />
    </div>
  );
}

export default Home;
