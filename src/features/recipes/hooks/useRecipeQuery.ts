import { useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  recipeFilterQuery,
  recipesPageQuery,
} from "@/api/useRecipes";
import { SORT_OPTIONS } from "../types";
import type { RecipeSort } from "../types";

const PAGE_SIZE = 9;
const MAX_PAGE = 1_000_000;

export function useRecipeQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: filters } = useSuspenseQuery(recipeFilterQuery());
  const { cuisines, meals, diets } = filters;

  // Read and validate the current page.
  const pageParam = Number(searchParams.get("page") ?? "1");

  const page =
    Number.isInteger(pageParam) &&
    pageParam >= 1 &&
    pageParam <= MAX_PAGE
      ? pageParam
      : 1;

  const searchQuery = searchParams.get("search") ?? "";

  const selectedMeals = searchParams
    .getAll("meal")
    .map((value) => value.toLowerCase());

  const selectedCuisines = searchParams
    .getAll("cuisine")
    .map((value) => value.toLowerCase());

  const selectedDiets = searchParams
    .getAll("diet")
    .map((value) => value.toLowerCase());

  const selectedTime = searchParams.get("totalTime");

  const sortParam = searchParams.get("sort");

  const sortBy: RecipeSort =
    SORT_OPTIONS.find((option) => option.value === sortParam)?.value ??
    "recommended";

  // The backend handles filtering, sorting, and pagination.
  const { data } = useSuspenseQuery(
    recipesPageQuery({
      page,
      limit: PAGE_SIZE,
      search: searchQuery,
      meals: selectedMeals,
      cuisines: selectedCuisines,
      diets: selectedDiets,
      totalTime: selectedTime,
      sort: sortBy,
    }),
  );

  const paginatedRecipes = data.recipes;
  const totalRecipes = data.totalCount;
  const totalPages = data.totalPages;

  const handleSearchChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }

        params.delete("page");

        return params;
      },
      { replace: true },
    );
  };

  const handleFilterChange = (
    filterId: string,
    value: string,
    checked: boolean,
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const normalizedValue = value.toLowerCase();

      if (filterId === "totalTime") {
        // Total time allows one selection.
        if (checked) {
          params.set(filterId, normalizedValue);
        } else {
          params.delete(filterId);
        }
      } else {
        // Meals, cuisines, and diets allow multiple selections.
        const values = params
          .getAll(filterId)
          .map((item) => item.toLowerCase())
          .filter((item) => item !== normalizedValue);

        params.delete(filterId);

        if (checked) {
          values.push(normalizedValue);
        }

        [...new Set(values)].forEach((item) => {
          params.append(filterId, item);
        });
      }

      params.delete("page");

      return params;
    });
  };

  const handleSortChange = (value: RecipeSort) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value === "recommended") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }

      params.delete("page");

      return params;
    });
  };

  const handlePageChange = (newPage: number) => {
    if (
      !Number.isInteger(newPage) ||
      newPage < 1 ||
      newPage > Math.min(MAX_PAGE, Math.max(1, totalPages))
    ) {
      return;
    }

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", String(newPage));
      }

      return params;
    });
  };

  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }

    const query = params.toString();

    return query ? `/recipes?${query}` : "/recipes";
  };

  return {
    cuisines,
    meals,
    diets,
    searchQuery,
    searchParams,
    selectedMeals,
    selectedCuisines,
    selectedDiets,
    selectedTime,
    paginatedRecipes,
    totalRecipes,
    sortBy,
    page,
    totalPages,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    getPageUrl,
  };
}