import { useQuery } from "@tanstack/react-query";
import { getCuisines, getDiets, getMeals, getRecipeById, getRecipesCard } from "./recipes";

export const useGetRecipesCardList = () => {
  return useQuery({
    queryKey: ["getRecipesCard"],
    queryFn: getRecipesCard,
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
  });
}

export const useGetMeals = () => {
  return useQuery({
    queryKey: ["getMealsList"],
    queryFn: getMeals,
  });
}

export const useGetDiets = () => {
  return useQuery({
    queryKey: ["getDietsList"],
    queryFn: getDiets,
  });
}
