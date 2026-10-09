import type { Recipe, RecipeFilterValues, RecipeSort } from "../types";

// Match recipe duration
export const matchesTimeFilter = (
  duration: number,
  selectedTime: string | null,
): boolean => {
  switch (selectedTime) {
    case "under-15":
      return duration < 15;

    case "under-30":
      return duration < 30;

    case "30-60":
      return duration >= 30 && duration <= 60;

    case "over-60":
      return duration > 60;

    default:
      return true;
  }
};

// Filter all recipes
export const filterRecipes = (
  recipes: Recipe[],
  filters: RecipeFilterValues,
): Recipe[] => {
  const search = filters.search.trim().toLowerCase();

  return recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(search);

    const matchesCuisine =
      filters.cuisines.length === 0 ||
      filters.cuisines.includes(recipe.cuisine.toLowerCase());

    const matchesMeal =
      filters.meals.length === 0 ||
      recipe.meal.some((meal) => filters.meals.includes(meal.toLowerCase()));

    const matchesTime = matchesTimeFilter(
      recipe.prepTime + recipe.cookingTime,
      filters.totalTime,
    );

    // Every selected dietary requirement must match
    const matchesDiet =
      filters.diets.length === 0 ||
      filters.diets.every((diet) => recipe.diets.includes(diet));

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesMeal &&
      matchesTime &&
      matchesDiet
    );
  });
};

// Sort filtered recipes
export const sortRecipes = (
  recipes: Recipe[],
  sortBy: RecipeSort,
): Recipe[] => {
  return [...recipes].sort((a, b) => {
    switch (sortBy) {
      case "HighestRated":
        return b.rating - a.rating;

      case "MostPopular":
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);

      case "ShortestTime":
        return a.prepTime + a.cookingTime - (b.prepTime + b.cookingTime);

      case "LongestTime":
        return b.prepTime + b.cookingTime - (a.prepTime + a.cookingTime);

      case "Asc":
        return a.title.localeCompare(b.title);

      case "Desc":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });
};

// Get one page of recipes
export const paginateRecipes = (
  recipes: Recipe[],
  page: number,
  pageSize: number,
): Recipe[] => {
  const start = (page - 1) * pageSize;

  return recipes.slice(start, start + pageSize);
};
