/* eslint-disable no-useless-catch */
import type { RecipeFilterOptions } from "@/features/recipes/types";
import api from ".";

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
  image: string;
  continent: {
    id: number;
    name: string;
  };
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


export const getRecipesCard = async () => {
  try {
    const res = await api.get(`pagination`);
    return res.data.recipes;
  } catch (e) {
    throw e;
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const res = await api.get(`recipe/${id}`);
    return res.data.recipe;
  } catch (e) {
    throw e;
  }
};

export const getCuisines = async (): Promise<CuisineType[]> => {
  const res = await api.get<{ data: CuisineType[] }>("cuisines");
  return res.data.data;
};

export const getMeals = async () => {
  try {
    const res = await api.get(`meals`);
    return res.data.data;
  } catch (e) {
    throw e;
  }
};

export const getDiets = async () => {
  try {
    const res = await api.get(`diets`);
    return res.data.data;
  } catch (e) {
    throw e;
  }
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

export const getSavedRecipes = async () => {
  const res = await api.get(`/recipes/save`);
  return res.data.savedRecipes;
};


