import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cuisinesQuery, mealsQuery, recipesCardQuery } from "@/api/useRecipes";

function Home() {
  const { data: recipes } = useSuspenseQuery(recipesCardQuery({ limit: 4 }));
  const { data: cuisines } = useSuspenseQuery(cuisinesQuery({ limit: 4 }));
  const { data: meals } = useSuspenseQuery(mealsQuery({ limit: 4 }));

  const namedCuisines = cuisines.filter(
    (cuisine): cuisine is typeof cuisine & { cuisineName: string } =>
      cuisine.cuisineName !== null && cuisine.cuisineName.trim().length > 0,
  );
  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />
      <MealCategories meals={meals} />
      <FoodRecommendation recipes={recipes} />
      <CuisineCategories cuisines={namedCuisines} />
    </div>
  );
}

export default Home;
