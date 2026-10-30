import { keepPreviousData, queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, fetchInfiniteRecipes, getCuisines, getDiets, getMeals, getRecipeById, getRecipeFilters, getRecipesCard, getRecipesInfiniteCard, getSavedRecipes, getSaveRecipe, postUserReview, saveRecipe, unSaveRecipe, updateReview, type InfiniteRecipesResponse, type LimitOptions, type RecipePaginationOptions } from "./recipes";
import { queryClient } from "./queryClient";

const invalidateRecipeReviewQueries = async (recipeId: number) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["getRecipeDetailById", recipeId],
    }),
    queryClient.invalidateQueries({
      queryKey: ["getRecipesInfinite"],
    }),
    queryClient.invalidateQueries({
      queryKey: ["getRecipesByPage"],
    }),
    queryClient.invalidateQueries({
      queryKey: ["getRecipesCard"],
    }),
    queryClient.invalidateQueries({
      queryKey: ["getSavedRecipesData"],
    }),
  ]);
};

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

//test
export const recipesInfiniteQuery = (
  cuisines: string | null = null,
  search: string | null = null,
  sort: string = "recommended",
  meal: string | null = null,
  diet: string | null = null,
  totalTime : string | null = null
) => ({
  queryKey: ["getRecipesInfinite", cuisines, search, sort, meal, diet, totalTime],
  queryFn: ({ pageParam }: { pageParam?: number | null }) =>
    fetchInfiniteRecipes({ pageParam, cuisines, search, sort, meal, diet, totalTime}),
  placeholderData: keepPreviousData,
  initialPageParam: null, // Start with no cursor
  getNextPageParam: (lastPage: InfiniteRecipesResponse) => lastPage.nextCursor ?? undefined,
});


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

export const usePostUserReview = () =>
  useMutation({
    mutationFn: postUserReview,
    onSuccess: async (_data, variables) => {
      await invalidateRecipeReviewQueries(variables.recipeId);
    },
  });

export const useDeleteReview = () =>
  useMutation({
    mutationFn: deleteReview,
    onSuccess: async (_data, recipeId) => {
      await invalidateRecipeReviewQueries(recipeId);
    },
  });

export const useUpdateReview = () =>
  useMutation({
    mutationFn: updateReview,
    onSuccess: async (_data, variables) => {
      await invalidateRecipeReviewQueries(variables.recipeId);
    },
  });

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

  