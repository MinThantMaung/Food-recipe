import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getCuisines, getDiets, getMeals, getRecipeById, getRecipeFilters, getRecipesCard, getSavedRecipes, getSaveRecipe, postUserReview, saveRecipe, unSaveRecipe, updateReview } from "./recipes";

export const useGetRecipesCardList = () => {
  return useQuery({
    queryKey: ["getRecipesCard"],
    queryFn: getRecipesCard,
    staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Retain inactive cache for 30 minutes
  });
};

export const useGetRecipeDetail = (id: number) => {
  return useQuery({
    queryKey: ["getRecipeDetailById", id],
    queryFn: () => getRecipeById(id),
    enabled: Number.isSafeInteger(id) && id > 0,
  });
};


export const useGetCuisines = () => {
  return useQuery({
    queryKey: ["getCuisinesList"],
    queryFn: getCuisines,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export const useGetMeals = () => {
  return useQuery({
    queryKey: ["getMealsList"],
    queryFn: getMeals,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export const useGetDiets = () => {
  return useQuery({
    queryKey: ["getDietsList"],
    queryFn: getDiets,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export const useGetRecipeFilters = () => {
  return useQuery({
    queryKey: ["getRecipeFilters"],
    queryFn: getRecipeFilters,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const usePostUserReview = () => {
  const queryClient = useQueryClient();

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
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: updateReview,
  });
};

export const useSaveRecipe = () => {
  return useMutation({
    mutationFn: saveRecipe,
  });
};


export const useUnSaveRecipe = () => {
  return useMutation({
    mutationFn: unSaveRecipe,
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

export const useGetSavedRecipesData = () => {
  return useQuery({
    queryKey: ["getSavedRecipesData"],
    queryFn: getSavedRecipes,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};