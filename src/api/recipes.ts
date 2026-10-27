/* eslint-disable no-useless-catch */
import type { Recipe, RecipeFilterOptions } from "@/features/recipes/types";
import api from ".";
import type { SavedRecipeItem } from "@/pages/SavedRecipe";

export type InfiniteRecipesResponse = {
  message: string;
  hasNextPage: boolean;
  nextCursor: number | null;
  recipes: Recipe[];
  totalPages: number;
  totalCount: number;
};


type RecipeFiltersResponse = {
  message: string;
  data: RecipeFilterOptions;
};

type PostReviewInput = {
  recipeId: number;
  rating: number;
  comment: string;
};

type UpdateReviewData = {
  recipeId: number;
  rating: number;
  comment: string;
};

type SaveRecipeData = {
  recipeId: number;
};

type SavedRecipeIdsResponse = {
  message: string;
  savedRecipeIds: number[];
};


export type CuisineType = {
  id: number;
  cuisineName: string | null;
  description: string | null;
  image: string | null;
  continent: {
    id: number;
    name: string;
  };
};

export type Diet = {
  id: number;
  name: string;
};

export type Continent = {
  id: number;
  name: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
};

export type LimitOptions = {
  limit?: number;
};

export type RecipePaginationOptions = {
  page?: number;
  limit?: number;
  search?: string;
  meals?: string[];
  cuisines?: string[];
  diets?: string[];
  totalTime?: string | null;
  sort?: string;
};


export type MealType = {
  id: number;
  name: string;
  image: string | null;
}

export const getRecipesCard = async (
  { limit = 4 }: LimitOptions = {},
) => {
  const res = await api.get("pagination", {
    params: { page: 1, limit },
  });

  return res.data.recipes;
};

export const getRecipesInfiniteCard = async (
  { page = 1, limit = 9 }: RecipePaginationOptions = {},
) => {
  const res = await api.get("recipes", {
    params: { page, limit },
  });

  return res.data;
};

//test
export const fetchInfiniteRecipes = async ({
  pageParam = null,
  cuisines = null,
  search = null,
  sort = null
}: {
  pageParam?: number | null;
  cuisines?: string | null;
  search?: string | null;
  sort?: string | null;
}): Promise<InfiniteRecipesResponse> => {
  let query = pageParam ? `?limit=9&cursor=${pageParam}` : "?limit=9";
  if (cuisines) query += `&countryId=${cuisines}`;
  if (search) query += `&search=${search}`;
  if (sort) query += `&sort=${sort}`
  const response = await api.get(`recipes${query}`);
  return response.data;
};

export const getRecipeById = async (id: number) => {
  try {
    const res = await api.get(`recipe/${id}`);
    return res.data.recipe;
  } catch (e) {
    throw e;
  }
};

export const getCuisines = async (
  { limit }: LimitOptions = {},
): Promise<CuisineType[]> => {
  const res = await api.get<{ data: CuisineType[] }>("cuisines", {
    params: { limit },
  });

  return res.data.data;
};


export const getMeals = async (
  { limit }: LimitOptions = {},
): Promise<MealType[]> => {
  const res = await api.get<{ data: MealType[] }>("meals", {
    params: { limit },
  });

  return res.data.data;
};

export const getDiets = async (): Promise<Diet[]> => {
  const res = await api.get<{ data: Diet[] }>("diets");
  return res.data.data;
};

export const getRecipesByMeal = async () => {
  try {
    const res = await api.get(`cuisinesByMeal`);
    return res.data.data;
  } catch (e) {
    throw e;
  }
};

export const getRecipeFilters = async (): Promise<RecipeFilterOptions> => {
  const response = await api.get<RecipeFiltersResponse>("recipe-filters");

  return response.data.data;
};

export const postUserReview = async ({
  recipeId,
  rating,
  comment,
}: PostReviewInput) => {
  const res = await api.post(`review/${recipeId}`, {
    rating,
    comment,
  });

  return res.data;
};


export const getUserById = async () => {
  try {
    const res = await api.get(`user`);
    return res.data.user;
  } catch (e) {
    throw e;
  }
};

export const getContinents = async (): Promise<Continent[]> => {
  const res = await api.get<{ data: Continent[] }>("continents");
  return res.data.data;
};

export const getCountries = async (
  continentId: number,
): Promise<Country[]> => {
  const res = await api.get<{ data: Country[] }>(
    `continents/${continentId}/countries`,
  );

  return res.data.data;
};

//to change
export const deleteReview = async(
  recipeId: number
) => {
  const res = await api.delete(`recipe/${recipeId}/review`)
  return res.data;
}

export const updateReview = async ({
  recipeId,
  rating,
  comment,
}: UpdateReviewData) => {
  const res = await api.patch(`/recipe/${recipeId}/review`, {
    rating,
    comment,
  });

  return res.data;
};

export const saveRecipe = async ({ recipeId }: SaveRecipeData) => {
  const res = await api.post(`/recipe/${recipeId}/save`);
  return res.data;
};


export const getSaveRecipe = async (): Promise<number[]> => {
  const res = await api.get<SavedRecipeIdsResponse>("/get/save");

  return res.data.savedRecipeIds;
};


export const unSaveRecipe = async ({ recipeId }: SaveRecipeData) => {
  const res = await api.delete(`/recipe/${recipeId}/unsave`);
  return res.data;
};

export const getSavedRecipes = async (): Promise<
  SavedRecipeItem[]
> => {
  const res = await api.get<{
    savedRecipes: SavedRecipeItem[];
  }>("/recipes/save");

  return res.data.savedRecipes;
};


