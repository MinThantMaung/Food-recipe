import { authApi } from "@/api";
import useAuthStore, { Status } from "@/stores/authStore";
import axios from "axios";
import { redirect } from "react-router";

export const loginLoader = async () => {
  try {
    await authApi.get("auth-check");
    return redirect("/");
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
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
  try {
    const response = await authApi.get("auth-check");

    // Authenticated: allow Home to render
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Not authenticated: redirect to Login
      return redirect("/login");
    }

    throw error;
  }
};