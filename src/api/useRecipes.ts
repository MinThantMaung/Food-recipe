import { useQuery } from "@tanstack/react-query";
import { getRecipeById, getRecipesCard } from "./recipes";

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
