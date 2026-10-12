import type {
  Recipe,
  RecipeFilterValues,
  RecipeSort,
} from "../types";

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

  const selectedMeals = filters.meals.map((value) =>
    value.toLowerCase(),
  );
  const selectedCuisines = filters.cuisines.map((value) =>
    value.toLowerCase(),
  );
  const selectedDiets = filters.diets.map((value) =>
    value.toLowerCase(),
  );

  return recipes.filter((recipe) => {
    const categories = recipe.recipeCategories.map(
      (item) => item.category,
    );

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search);

    const cuisineName =
      recipe.country.cuisineName?.toLowerCase() ?? "";

    const matchesCuisine =
      selectedCuisines.length === 0 ||
      selectedCuisines.includes(cuisineName);

    // Match any selected meal
    const matchesMeal =
      selectedMeals.length === 0 ||
      categories.some(
        (category) =>
          category.type === "MEAL" &&
          selectedMeals.includes(category.name.toLowerCase()),
      );

    const duration =
      (recipe.prepTime ?? 0) + (recipe.cookingTime ?? 0);

    const matchesTime = matchesTimeFilter(
      duration,
      filters.totalTime,
    );

    // Match every selected dietary requirement
    const matchesDiet =
      selectedDiets.length === 0 ||
      selectedDiets.every((diet) =>
        categories.some(
          (category) =>
            category.type === "DIET" &&
            category.name.toLowerCase() === diet,
        ),
      );

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
        return (b.rating ?? 0) - (a.rating ?? 0);

      case "MostPopular":
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);

      case "ShortestTime":
        return (
          (a.prepTime ?? 0) +
          (a.cookingTime ?? 0) -
          ((b.prepTime ?? 0) + (b.cookingTime ?? 0))
        );

      case "LongestTime":
        return (
          (b.prepTime ?? 0) +
          (b.cookingTime ?? 0) -
          ((a.prepTime ?? 0) + (a.cookingTime ?? 0))
        );

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