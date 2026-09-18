import { redirect, type ActionFunctionArgs } from "react-router";
import axios, { AxiosError } from "axios";
import useAuthStore, { Status } from "@/stores/authStore";
import api, { authApi } from "@/api";

type ApiErrorResponse = {
  message?: string;
};

export type LoginActionData = {
  error: string;
};

export const loginAction = async ({
  request,
}: ActionFunctionArgs): Promise<Response | LoginActionData> => {
  const formData = await request.formData();

  const credentials = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  try {
    await authApi.post("login", credentials);

    const redirectTo =
      new URL(request.url).searchParams.get("redirect") || "/";

    return redirect(redirectTo);
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return {
        error:
          error.response?.data?.message ??
          "Login failed. Please check your email and password.",
      };
    }

    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    credentials[key] = value;
  });

  try {
    const response = await authApi.post("register", credentials);
    authStore.setAuth(response.data.email, response.data.token, Status.otp);
    return redirect("/register/verify-otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const verifyOtpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    email: authStore.email,
    otp: formData.get("otp"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("verify-otp", credentials);
    authStore.setAuth(response.data.email, response.data.token, Status.confirm);
    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const confirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();

  const credentials = {
    email: authStore.email,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    await authApi.post("confirm-password", credentials);
    authStore.clearAuth();
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
   
  }
};