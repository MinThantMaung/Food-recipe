import { FoodCard } from "@/utils/FoodCard";

import { RecipeSearch } from "@/features/recipes/components/RecipeSearch";
import { RecipeFilters } from "@/features/recipes/components/RecipeFilters";
import { RecipeToolbar } from "@/features/recipes/components/RecipeToolbar";
import { RecipePagination } from "@/features/recipes/components/RecipePagination";

import { useRecipeQuery } from "@/features/recipes/hooks/useRecipeQuery";

function Recipes() {
  const {
    isLoading,
    isError,
    cuisines,
    meals,
    diets,
    searchQuery,
    searchParams,
    filteredRecipes,
    paginatedRecipes,
    sortBy,
    page,
    totalPages,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    getPageUrl,
  } = useRecipeQuery();

  if (isLoading) {
    return (
      <main
        aria-busy="true"
        className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4"
      >
        <p role="status" className="text-muted-foreground">
          Loading recipes…
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <p role="alert" className="text-muted-foreground">
          Unable to load recipes. Please try again.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
          Find your next favorite recipe
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Discover easy, delicious recipes from around the world.
          Search, filter and find something great to cook today.
        </p>
      </div>

      {/* Search */}
      <RecipeSearch
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <RecipeFilters
          searchParams={searchParams}
          onFilterChange={handleFilterChange}
          cuisines={cuisines}
          meals={meals}
          diets={diets}
        />

        <section
          aria-label="Recipe results"
          className="min-w-0"
        >
          <RecipeToolbar
            count={filteredRecipes.length}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          {paginatedRecipes.length === 0 ? (
            <div className="rounded-xl border border-dashed px-6 py-16 text-center">
              <h3 className="font-semibold">
                No recipes found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Try another search or adjust your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedRecipes.map((recipe) => (
                <FoodCard
                  key={recipe.id}
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

          <RecipePagination
            page={page}
            totalPages={totalPages}
            getPageUrl={getPageUrl}
          />
        </section>
      </div>
    </main>
  );
}

export default Recipes;