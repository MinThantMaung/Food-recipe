import useAuthStore, { Status } from "@/stores/authStore";
import { redirect } from "react-router";

export const loginLoader = async () => {
  try {
    //await authApi.get("auth-check");
    return redirect("/");
  } catch (error) {
    console.log("Loader error:", error);
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