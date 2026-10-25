import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, getCuisines, getDiets, getMeals, getRecipeById, getRecipeFilters, getRecipesCard, getRecipesInfiniteCard, getSavedRecipes, getSaveRecipe, postUserReview, saveRecipe, unSaveRecipe, updateReview, type LimitOptions, type RecipePaginationOptions } from "./recipes";
import { queryClient } from "./queryClient";


export const recipesCardQuery = (
  { limit = 4 }: LimitOptions = {},
) =>
  queryOptions({
    queryKey: ["getRecipesCard", { limit }],
    queryFn: () => getRecipesCard({ limit }),
  });

export const recipesPageQuery = (
  {
    page = 1,
    limit = 9,
    search = "",
    meals = [],
    cuisines = [],
    diets = [],
    totalTime = null,
    sort = "recommended",
  }: RecipePaginationOptions = {},
) => {
  const options = {
    page,
    limit,
    search,
    meals,
    cuisines,
    diets,
    totalTime,
    sort,
  };

  return queryOptions({
    queryKey: ["getRecipesByPage", options],
    queryFn: () => getRecipesInfiniteCard(options),
  });
};


export const recipeDetailQuery = (id: number) =>
  queryOptions({
    queryKey: ["getRecipeDetailById", id],
    queryFn: () => getRecipeById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
  
export const cuisinesQuery = ({ limit }: LimitOptions = {}) =>
  queryOptions({
    queryKey: ["getCuisinesList", { limit: limit ?? null }],
    queryFn: () => getCuisines({ limit }),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });


export const mealsQuery = ({ limit }: LimitOptions = {}) =>
  queryOptions({
    queryKey: ["getMealsList", { limit }],
    queryFn: () => getMeals({ limit }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const dietQuery = () => 
  queryOptions({
    queryKey: ["getDietsList"],
    queryFn: getDiets,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const recipeFilterQuery = () =>
   queryOptions({
    queryKey: ["getRecipeFilters"],
    queryFn: getRecipeFilters,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const usePostUserReview = () => {
  return useMutation({
    mutationFn: postUserReview,
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getRecipeDetailById", variables.recipeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getRecipesCard"],
        }),
      ]);
    },
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: deleteReview,

    onSuccess: async (_data, recipeId) => {
      await queryClient.invalidateQueries({
        queryKey: recipeDetailQuery(recipeId).queryKey,
      });
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: updateReview,

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: recipeDetailQuery(variables.recipeId).queryKey,
      });
    },
  });
};

export const useSaveRecipe = () => {
  return useMutation({
    mutationFn: saveRecipe,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getSavedRecipes"],
        }),
        queryClient.invalidateQueries({
          queryKey: SavedRecipesDataQuery().queryKey,
        }),
      ]);
    },
  });
};


export const useUnSaveRecipe = () => {
 return useMutation({
    mutationFn: unSaveRecipe,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getSavedRecipes"],
        }),
        queryClient.invalidateQueries({
          queryKey: SavedRecipesDataQuery().queryKey,
        }),
      ]);
    },
  });
};

export const useGetSavedRecipes = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["getSavedRecipes", userId],
    queryFn: getSaveRecipe,
    enabled: userId !== undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};


export const SavedRecipesDataQuery = () => 
  queryOptions({
    queryKey: ["getSavedRecipesData"],
    queryFn: getSavedRecipes,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });