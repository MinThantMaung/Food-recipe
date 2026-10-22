import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, getCuisines, getDiets, getMeals, getRecipeById, getRecipeFilters, getRecipesCard, getSavedRecipes, getSaveRecipe, postUserReview, saveRecipe, unSaveRecipe, updateReview, type CuisineOptions, type RecipePaginationOptions } from "./recipes";
import { queryClient } from "./queryClient";


export const recipesCardQuery = (
  { cursor, limit = 4 }: RecipePaginationOptions = {},
) =>
  queryOptions({
    queryKey: ["getRecipesCard", { cursor: cursor ?? null, limit }],
    queryFn: () => getRecipesCard({ cursor, limit }),
  });

export const recipeDetailQuery = (id: number) =>
  queryOptions({
    queryKey: ["getRecipeDetailById", id],
    queryFn: () => getRecipeById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
  
export const cuisinesQuery = (
  { limit }: CuisineOptions = {},
) =>
  queryOptions({
    queryKey: ["getCuisinesList", { limit: limit ?? null }],
    queryFn: () => getCuisines({ limit }),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

export const mealsQuery = () =>
  queryOptions({
    queryKey: ["getMealsList"],
    queryFn: getMeals,
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
        queryKey: ["recipeDetail", recipeId],
      });
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: updateReview,
    onSuccess: async (_data, variables) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["recipeDetail", variables.recipeId],
    }),
    queryClient.invalidateQueries({
      queryKey: ["recipes"],
    }),
  ]);
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