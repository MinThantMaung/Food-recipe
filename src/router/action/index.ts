import { redirect, type ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";
import useAuthStore, { Status } from "@/stores/authStore";
import { authApi } from "@/api";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    credentials[key] = value;
  });
  try {
    //api
    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
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
