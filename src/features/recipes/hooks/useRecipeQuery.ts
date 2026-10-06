
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { recipesItems } from "@/utils/items";
import { SORT_OPTIONS } from "../types";
import type { RecipeSort } from "../types";

import {
  filterRecipes,
  sortRecipes,
  paginateRecipes,
} from "../utils/recipeUtils";

const PAGE_SIZE = 9;

export function useRecipeQuery() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  // Read filters from URL
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

  // Validate sort option from URL
  const sortParam = searchParams.get("sort");

  const sortBy: RecipeSort =
    SORT_OPTIONS.find(
      (option) => option.value === sortParam,
    )?.value ?? "recommended";

  // 1. Filter
  const filteredRecipes = filterRecipes(recipesItems, {
    search: searchQuery,
    meals: selectedMeals,
    cuisines: selectedCuisines,
    diets: selectedDiets,
    totalTime: selectedTime,
  });

  // 2. Sort
  const sortedRecipes = sortRecipes(
    filteredRecipes,
    sortBy,
  );

  // 3. Pagination
  const totalPages = Math.ceil(
    filteredRecipes.length / PAGE_SIZE,
  );

  const requestedPage = Number(
    searchParams.get("page"),
  );

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(
          requestedPage,
          Math.max(1, totalPages),
        )
      : 1;

  const paginatedRecipes = paginateRecipes(
    sortedRecipes,
    page,
    PAGE_SIZE,
  );

  // Search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // Reset to page 1 only when necessary
    if (searchParams.has("page")) {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.delete("page");

          return params;
        },
        { replace: true },
      );
    }
  };

  // Filter checkbox handler
  const handleFilterChange = (
    filterId: string,
    value: string,
    checked: boolean,
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const normalizedValue = value.toLowerCase();

      // Single selection: Total time
      if (filterId === "totalTime") {
        if (checked) {
          params.set(filterId, normalizedValue);
        } else {
          params.delete(filterId);
        }
      } else {
        // Multiple selections
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

  // Sort handler
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

  // Pagination URL
  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }

    const query = params.toString();

    return query ? `?${query}` : "/recipes";
  };

  return {
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
  };
}
