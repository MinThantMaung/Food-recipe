import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

import { recipeFilterQuery, recipesInfiniteQuery } from "@/api/useRecipes";
import { RecipeSearch } from "@/features/recipes/components/RecipeSearch";
import { RecipeToolbar } from "@/features/recipes/components/RecipeToolbar";
import ProductFilter, {
  type FilterValues,
} from "@/features/recipes/components/RecipeFilter";
import { RecipePagination } from "@/features/recipes/components/RecipePagination";
import { SORT_OPTIONS } from "@/features/recipes/types";
import { FoodCard } from "@/utils/FoodCard";

type RecipeSort = (typeof SORT_OPTIONS)[number]["value"];

function Recipes() {
  const [searchParams] = useSearchParams();

  const filterParams = new URLSearchParams(searchParams);

  filterParams.delete("page");
  filterParams.delete("cursor");
  filterParams.sort();

  // Reset local pagination when search, filters, or sort changes.
  return <RecipesContent key={filterParams.toString()} />;
}

function RecipesContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: filters } = useSuspenseQuery(recipeFilterQuery());

  const [pageIndex, setPageIndex] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);

  const navigationPending = useRef(false);
  const navigationVersion = useRef(0);

  const filterList = {
    meals: filters.meals.map((meal) => ({
      id: String(meal.id),
      label: meal.name,
    })),

    cuisines: filters.cuisines.map((cuisine) => ({
      id: String(cuisine.id),
      label: cuisine.cuisineName ?? "",
    })),

    diet: filters.diets.map((diet) => ({
      id: String(diet.id),
      label: diet.name,
    })),

    totalTime: [
      { id: "1", label: "Under 15 minutes" },
      { id: "2", label: "Under 30 minutes" },
      { id: "3", label: "Under 60 minutes" },
      { id: "4", label: "Under 90 minutes" },
    ],
  };

  useEffect(() => {
    return () => {
      navigationVersion.current += 1;
    };
  }, []);

  const countryId = searchParams.get("countryId");
  const search = searchParams.get("search");

  const sort =
    SORT_OPTIONS.find((option) => option.value === searchParams.get("sort"))
      ?.value ?? "recommended";

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPlaceholderData,
  } = useInfiniteQuery(
    // Once your query/API supports sorting, pass sort here too
    // and include it in the query key and request parameters.
    recipesInfiniteQuery(countryId, search,sort),
  );

  const loadedPages = data?.pages.length ?? 0;
  const totalPages = data?.pages[0]?.totalPages ?? 0;

  const totalRecipes = isPlaceholderData
    ? undefined
    : data?.pages[0]?.totalCount;

  const activePageIndex = Math.min(
    pageIndex,
    Math.max(0, loadedPages - 1),
    Math.max(0, totalPages - 1),
  );

  const recipes = data?.pages[activePageIndex]?.recipes ?? [];

  const paginationDisabled = isFetching || isPlaceholderData || isChangingPage;

  function resetPagination() {
    // Stop any ongoing sequence of cursor requests.
    navigationVersion.current += 1;
    navigationPending.current = false;

    setIsChangingPage(false);
    setNavigationError(null);
    setPageIndex(0);
  }

  function handleSortChange(value: RecipeSort) {
    if (value === sort) return;

    resetPagination();

    const params = new URLSearchParams(searchParams);

    if (value === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.delete("page");
    params.delete("cursor");

    setSearchParams(params);
  }

  async function handlePageChange(page: number) {
    if (
      paginationDisabled ||
      navigationPending.current ||
      !Number.isInteger(page) ||
      page < 1 ||
      page > totalPages ||
      page === activePageIndex + 1
    ) {
      return;
    }

    const targetIndex = page - 1;

    setNavigationError(null);

    // Already fetched: display immediately.
    if (targetIndex < loadedPages) {
      setPageIndex(targetIndex);
      return;
    }

    navigationPending.current = true;
    setIsChangingPage(true);

    const version = navigationVersion.current;

    try {
      let fetchedPages = loadedPages;
      let moreAvailable = Boolean(hasNextPage);

      // Fetch missing pages sequentially to discover their cursors.
      while (fetchedPages <= targetIndex) {
        if (version !== navigationVersion.current) return;

        if (!moreAvailable) {
          throw new Error("This page is no longer available.");
        }

        const result = await fetchNextPage();

        if (version !== navigationVersion.current) return;

        if (result.isError) {
          throw new Error(
            "Could not load the selected page. Please try again.",
          );
        }

        const newPageCount = result.data?.pages.length ?? 0;

        if (newPageCount <= fetchedPages) {
          throw new Error(
            "Could not load the selected page. Please try again.",
          );
        }

        fetchedPages = newPageCount;
        moreAvailable = Boolean(result.hasNextPage);
      }

      setPageIndex(targetIndex);
    } catch (error) {
      if (version === navigationVersion.current) {
        setNavigationError(
          error instanceof Error
            ? error.message
            : "Could not load recipes. Please try again.",
        );
      }
    } finally {
      if (version === navigationVersion.current) {
        navigationPending.current = false;
        setIsChangingPage(false);
      }
    }
  }

  function handleApplyFilters(values: FilterValues) {
    resetPagination();

    const params = new URLSearchParams(searchParams);

    const filters = {
      meal: values.meals.join(","),
      countryId: values.cuisines.join(","),
      diet: values.diet.join(","),
      totaltime: values.totalTime,
    };

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.delete("page");
    params.delete("cursor");

    setSearchParams(params);
  }

  function handleSearch(value: string) {
    const nextSearch = value.trim();

    resetPagination();

    const params = new URLSearchParams(searchParams);

    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    params.delete("page");
    params.delete("cursor");

    setSearchParams(params);
  }

  return (
  <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
    {/* Compact page header */}
    <header className="mb-8 border-b border-gray-200/80 pb-8 lg:mb-10">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_420px] lg:gap-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
            Discover your next dish
          </p>

          <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl">
            Good food starts here.
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            Find everyday favorites and something new to cook.
          </p>
        </div>

        <div className="w-full [&>form]:m-0 [&>form]:max-w-none">
          <RecipeSearch
            initialValue={search ?? ""}
            onSearch={handleSearch}
          />

          <p className="mt-2 pl-4 text-xs text-gray-400">
            Search by recipe name, then press Enter.
          </p>
        </div>
      </div>
    </header>

    {/* Mobile filters */}
    <details className="group mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-4 text-orange-500"
          />
          Filter recipes
        </span>

        <span className="text-xs font-medium text-orange-600 group-open:hidden">
          Show filters
        </span>

        <span className="hidden text-xs font-medium text-orange-600 group-open:inline">
          Hide filters
        </span>
      </summary>

      <div className="border-t border-gray-100 p-3">
        <ProductFilter
          filterList={filterList}
          onApply={handleApplyFilters}
        />
      </div>
    </details>

    {/* Shared rows align headings and content */}
    <div className="grid grid-cols-1 items-start gap-y-5 lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-x-7 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-x-8">
      {/* Desktop filter heading */}
      <div className="hidden min-h-11 items-center gap-3 px-1 lg:col-start-1 lg:row-start-1 lg:flex">
        <span className="flex size-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <SlidersHorizontal
            aria-hidden="true"
            className="size-4"
          />
        </span>

        <h2
          id="recipe-filters-heading"
          className="text-sm font-semibold text-gray-950"
        >
          Filter recipes
        </h2>
      </div>

      {/* Results toolbar */}
      <div className="min-w-0 [&>div]:mb-0 [&>div]:min-h-11 [&_h2]:text-xl lg:col-start-2 lg:row-start-1">
        <RecipeToolbar
          totalRecipes={totalRecipes}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Natural-height sidebar */}
      <aside
        aria-labelledby="recipe-filters-heading"
        className="hidden min-w-0 self-start [&>*]:w-full lg:col-start-1 lg:row-start-2 lg:block"
      >
        <ProductFilter
          filterList={filterList}
          onApply={handleApplyFilters}
        />
      </aside>

      {/* Recipe results */}
      <section
        aria-label="Recipe results"
        aria-busy={isFetching || isChangingPage}
        className="min-w-0 lg:col-start-2 lg:row-start-2"
      >
        {isPending ? (
          <div role="status">
            <span className="sr-only">Loading recipes...</span>

            <div
              aria-hidden="true"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="aspect-4/3 bg-gray-100 motion-safe:animate-pulse" />

                  <div className="space-y-3 p-4">
                    <div className="h-5 w-4/5 rounded bg-gray-100 motion-safe:animate-pulse" />
                    <div className="h-4 w-3/5 rounded bg-gray-100 motion-safe:animate-pulse" />
                    <div className="h-4 w-2/5 rounded bg-gray-100 motion-safe:animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isError && !data ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center"
          >
            <h3 className="text-base font-semibold text-gray-950">
              Could not load recipes
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error?.message || "Please try again shortly."}
            </p>
          </div>
        ) : (
          <>
            {recipes.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-12 text-center">
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <SlidersHorizontal
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <h3 className="text-lg font-semibold text-gray-950">
                  No recipes found
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  Try a different recipe name or adjust your filters.
                </p>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 items-stretch gap-5 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${
                  isPlaceholderData || isChangingPage
                    ? "opacity-60"
                    : ""
                }`}
              >
                {recipes.map((recipe) => (
                  <FoodCard
                    key={recipe.id}
                    recipeId={recipe.id}
                    title={recipe.title}
                    image={recipe.image ?? ""}
                    to={`/recipes/${recipe.id}`}
                    prepTime={recipe.prepTime}
                    cookingTime={recipe.cookingTime}
                    country={recipe.country}
                    rating={0}
                    reviewCount={0}
                  />
                ))}
              </div>
            )}

            {(navigationError || isError) && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600"
              >
                {navigationError ||
                  "Could not refresh recipes. Please try again."}
              </p>
            )}

            {totalPages > 1 && (
              <div className="mt-7 border-t border-gray-200/80 pt-5 [&>div]:mt-0">
                <RecipePagination
                  currentPage={activePageIndex + 1}
                  totalPages={totalPages}
                  disabled={paginationDisabled}
                  isChangingPage={isChangingPage}
                  onPageChange={(page) => {
                    void handlePageChange(page);
                  }}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  </main>
);
}

export default Recipes;
