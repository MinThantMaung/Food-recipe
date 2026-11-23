import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";
import { useQuery } from "@tanstack/react-query";
import {
  cuisinesQuery,
  mealsQuery,
  recipesCardQuery,
} from "@/api/useRecipes";

function SectionSkeleton({ label }: { label: string }) {
  return (
    <section
      className="py-8"
      role="status"
      aria-label={`Loading ${label}`}
    >
      <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="aspect-4/3 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>

      <span className="sr-only">Loading {label}...</span>
    </section>
  );
}

function SectionError({
  label,
  onRetry,
}: {
  label: string;
  onRetry: () => void;
}) {
  return (
    <section className="py-8">
      <p className="text-gray-600">Could not load {label}.</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 cursor-pointer font-medium text-orange-600"
      >
        Try again
      </button>
    </section>
  );
}

function Home() {
  const recipes = useQuery(recipesCardQuery({ limit: 4 }));
  const cuisines = useQuery(cuisinesQuery({ limit: 4 }));
  const meals = useQuery(mealsQuery({ limit: 4 }));

  const namedCuisines = (cuisines.data ?? []).filter(
    (cuisine): cuisine is typeof cuisine & { cuisineName: string } =>
      cuisine.cuisineName !== null &&
      cuisine.cuisineName.trim().length > 0,
  );

  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />

      {meals.isPending ? (
        <SectionSkeleton label="meals" />
      ) : meals.data ? (
        <MealCategories meals={meals.data} />
      ) : (
        <SectionError
          label="meals"
          onRetry={() => void meals.refetch()}
        />
      )}

      {recipes.isPending ? (
        <SectionSkeleton label="recipes" />
      ) : recipes.data ? (
        <FoodRecommendation recipes={recipes.data} />
      ) : (
        <SectionError
          label="recipes"
          onRetry={() => void recipes.refetch()}
        />
      )}

      {cuisines.isPending ? (
        <SectionSkeleton label="cuisines" />
      ) : cuisines.data ? (
        <CuisineCategories cuisines={namedCuisines} />
      ) : (
        <SectionError
          label="cuisines"
          onRetry={() => void cuisines.refetch()}
        />
      )}
    </div>
  );
}

export default Home;