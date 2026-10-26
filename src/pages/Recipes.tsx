import { SlidersHorizontal } from "lucide-react";

import { FoodCard } from "@/utils/FoodCard";
import { RecipeSearch } from "@/features/recipes/components/RecipeSearch";
import { RecipeFilters } from "@/features/recipes/components/RecipeFilters";
import { RecipeToolbar } from "@/features/recipes/components/RecipeToolbar";
import { RecipePagination } from "@/features/recipes/components/RecipePagination";
import { useRecipeQuery } from "@/features/recipes/hooks/useRecipeQuery";
import type { Recipe } from "@/features/recipes/types";

function Recipes() {
  const {
    cuisines,
    meals,
    diets,
    searchQuery,
    searchParams,
    totalRecipes,
    paginatedRecipes,
    sortBy,
    page,
    totalPages,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    getPageUrl,
  } = useRecipeQuery();

  const filters = (
    <RecipeFilters
      searchParams={searchParams}
      onFilterChange={handleFilterChange}
      cuisines={cuisines}
      meals={meals}
      diets={diets}
    />
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Page header */}
      <header className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
          Find your next favorite recipe
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
          Discover easy, delicious recipes from around the world. Search,
          filter and find something great to cook today.
        </p>
      </header>

      {/* Search */}
      <div className="mx-auto mb-10 max-w-2xl lg:mb-12">
        <RecipeSearch
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Mobile filters */}
      <details className="group mb-6 rounded-2xl border border-gray-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <SlidersHorizontal
              aria-hidden="true"
              className="size-4 text-orange-500"
            />
            Filters
          </span>

          <span className="text-xs text-gray-500 group-open:hidden">
            Show filters
          </span>

          <span className="hidden text-xs text-gray-500 group-open:inline">
            Hide filters
          </span>
        </summary>

        <div className="border-t border-gray-100 p-3">
          {filters}
        </div>
      </details>

      {/* Shared rows align desktop headers and panel edges */}
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-10">
        {/* Desktop filter heading */}
        <div className="hidden items-center gap-2 px-1 lg:col-start-1 lg:row-start-1 lg:flex">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-4 text-orange-500"
          />

          <h2
            id="recipe-filters-heading"
            className="text-base font-semibold text-gray-950"
          >
            Filters
          </h2>
        </div>

        {/* Results toolbar */}
        <div className="min-w-0 *:mb-0 lg:col-start-2 lg:row-start-1">
          <RecipeToolbar
            count={totalRecipes}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Desktop filter panel */}
        <aside
          aria-labelledby="recipe-filters-heading"
          className="hidden min-w-0 flex-col *:w-full *:flex-1 lg:col-start-1 lg:row-start-2 lg:flex"
        >
          {filters}
        </aside>

        {/* Recipe results */}
        <section
          aria-label="Recipe results"
          className="min-w-0 lg:col-start-2 lg:row-start-2"
        >
          {paginatedRecipes.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-950">
                {totalRecipes > 0
                  ? "No recipes on this page"
                  : "No recipes found"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {totalRecipes > 0
                  ? "Choose another page to view recipes."
                  : "Try another search or adjust your filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedRecipes.map((recipe: Recipe) => (
                <FoodCard
                  key={recipe.id}
                  recipeId={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  to={`/recipes/${recipe.id}`}
                  prepTime={recipe.prepTime}
                  cookingTime={recipe.cookingTime}
                  country={recipe.country}
                  rating={recipe.rating}
                  reviewCount={recipe.reviewCount}
                />
              ))}
            </div>
          )}
        </section>

        {/* Pagination below both panels */}
        {totalPages > 1 && (
          <div className="mt-4 min-w-0 border-t border-gray-200 pt-6 lg:col-start-2 lg:row-start-3">
            <RecipePagination
              page={page}
              totalPages={totalPages}
              getPageUrl={getPageUrl}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Recipes;