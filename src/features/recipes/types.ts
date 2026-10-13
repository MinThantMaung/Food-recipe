
import type { FoodCardProps } from "@/utils/FoodCard";

export type Recipe = Omit<FoodCardProps, "to"> & {
  id: number;
  recipeCategories: {
    category: {
      id: number;
      name: string;
      type: "MEAL" | "DIET" | "COOKING_METHOD" | "OCCASION";
    };
  }[];
};

export type RecipeFilterId =
  | "meal"
  | "cuisine"
  | "totalTime"
  | "diet";

// One definition for sort values and visible labels
export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "HighestRated", label: "Highest rated" },
  { value: "MostPopular", label: "Most reviewed" },
  { value: "ShortestTime", label: "Quickest to cook" },
  { value: "LongestTime", label: "Longest cooking time" },
  { value: "Asc", label: "Name: A to Z" },
  { value: "Desc", label: "Name: Z to A" },
] as const;

export type RecipeSort =
  (typeof SORT_OPTIONS)[number]["value"];

export type RecipeFilterValues = {
  search: string;
  meals: string[];
  cuisines: string[];
  diets: string[];
  totalTime: string | null;
};

export type CategoryFilterOption = {
  id: number;
  name: string;
};

export type CuisineFilterOption = {
  id: number;
  cuisineName: string | null;
};

export type RecipeFilterOptions = {
  cuisines: CuisineFilterOption[];
  meals: CategoryFilterOption[];
  diets: CategoryFilterOption[];
};