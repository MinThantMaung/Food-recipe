import { authApi } from "@/api";
import { queryClient } from "@/api/queryClient";
import {
  cuisinesQuery,
  mealsQuery,
  recipeDetailQuery,
  recipeFilterQuery,
  recipesCardQuery,
  SavedRecipesDataQuery,
} from "@/api/useRecipes";
import { continentsQuery, userProfileQuery } from "@/api/useUser";
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
      ...cuisinesQuery({ limit: 4 }),
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
  queryClient.query({
    ...cuisinesQuery(),
    staleTime: "static",
  });
};

export const recipesLoader = async () => {
  await Promise.all([
    queryClient.query({
      ...recipesCardQuery(),
      staleTime: "static",
    }),
    queryClient.query({
      ...recipeFilterQuery(),
      staleTime: "static",
    }),
  ]);

  return null;
};

export const recipesDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.recipeId);

  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Response("Invalid recipe ID", {
      status: 400,
    });
  }

  const recipe = await queryClient.query({
    ...recipeDetailQuery(id),
    staleTime: "static",
  });

  if (!recipe) {
    throw new Response("Recipe not found", {
      status: 404,
    });
  }

  return { id };
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
    await Promise.all([
      queryClient.query(userProfileQuery()),
      queryClient.query(continentsQuery()),
    ]);

    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw redirect("/login");
    }

    throw error;
  }
};

export const settingLoader = async () => {
  try {
    await queryClient.query(userProfileQuery());

    return null;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      throw redirect("/login");
    }

    throw error;
  }
};

export const savedRecipesLoader = async () => {
  await queryClient.query({
    ...SavedRecipesDataQuery(),
    staleTime: "static",
  });
  return null;
};
