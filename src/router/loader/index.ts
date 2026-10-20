import { authApi } from "@/api";
import { queryClient } from "@/api/queryClient";
import { getContinents, getCuisines, getRecipeById, getRecipeFilters, getRecipesCard, getSavedRecipes, getUserById } from "@/api/recipes";
import { cuisinesQuery, mealsQuery, recipesCardQuery } from "@/api/useRecipes";
import useAuthStore, { Status } from "@/features/auth/stores/authStore";
import axios from "axios";
import { redirect, type LoaderFunctionArgs } from "react-router";

export const loginLoader = async () => {
  try {
    await authApi.get("auth-check");
    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    return null;
  }
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }

  return null;
};

export const confirmLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }

  return null;
};

export const homeLoader = async () => {
  await Promise.all([
    queryClient.query({
      ...recipesCardQuery(),
      staleTime: "static",
    }),
    queryClient.query({
      ...cuisinesQuery(),
      staleTime: "static",
    }),
    queryClient.query({
      ...mealsQuery(),
      staleTime: "static",
    }),
  ]);

  return null;
};

export const cuisinesLoader = async () => {
  return await getCuisines();
};

export const recipesLoader = async () => {
  const [recipes, filters] = await Promise.all([
    getRecipesCard(),
    getRecipeFilters(),
  ]);

  return { recipes, filters };
};

export const recipesDetailLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = Number(params.recipeId);

  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Response("Invalid recipe ID", { status: 400 });
  }

  const recipe = await getRecipeById(id);

  if (!recipe) {
    throw new Response("Recipe not found", { status: 404 });
  }

  return recipe;
};

export const updateCountryLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.update) {
    return redirect("/register");
  }

  return null;
};

export const profileLoader = async () => {
  try {

    const [user, continent] = await Promise.all([
      getUserById(),
      getContinents(),
    ]);

    return {
      user,
      continent
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw redirect("/login");
    }

    throw error;
  }
};

export const settingLoader = async () => {
  try {
    const user = await getUserById();
    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw redirect("/login");
    }

    throw error;
  }
};

export const savedRecipesLoader = async () => {
  const savedRecipes = await getSavedRecipes();
  return savedRecipes;
};
