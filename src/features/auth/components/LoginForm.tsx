import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import logo from "../../../assets/food-recipe-logo.svg";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginActionData } from "@/router/action";
import { EmailField } from "../../../components/form/EmailField";
import { PasswordField } from "../../../components/form/PasswordField";
import { SubmitButton } from "../../../components/form/SubmitButton";
import { authApi } from "@/api";
import { useState } from "react";
import axios from "axios";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      error: "Email is required",
    })
    .pipe(
      z.email({
        error: "Please enter a valid email address",
      }),
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const submit = useSubmit();
  const actionData = useActionData() as LoginActionData | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleLogin = (data: LoginFormValues) => {
    submit(data, { method: "post", action: "/login" });
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    setGoogleError(null);

    if (!response.credential) {
      setGoogleError("Google did not return a credential. Please try again.");
      return;
    }

    setIsGoogleSubmitting(true);

    try {
      const result = await authApi.post("google", {
        credential: response.credential,
      });

      // Temporary: the backend currently verifies identity only.
      if (result.data.authenticated !== true) {
        setGoogleError(
          "Google identity verified. App login still needs database and cookie setup.",
        );
        return;
      }

      // After the backend sets your login cookies:
      window.location.assign("/");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setGoogleError(message ?? "Google login failed. Please try again.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl shadow-orange-950/5">
      <CardHeader className="gap-5">
        <div className="flex items-center gap-1.5">
          <img src={logo} alt="" className="size-8 shrink-0" />

          <span className="text-lg font-bold tracking-tight text-orange-500">
            Food Recipe
          </span>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>

          <CardDescription className="text-sm leading-relaxed">
            Sign in to save your favorites and find your next recipe.
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <CardContent className="space-y-4">
          {actionData?.error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {actionData.error}
            </div>
          )}

          <EmailField
            id="email"
            placeholder="food@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            labelAction={
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-orange-500 underline"
              >
                Forgot password?
              </Link>
            }
            {...register("password")}
          />
        </CardContent>

        <CardFooter className="mt-6 flex flex-col gap-5">
          <SubmitButton
            isSubmitting={isSubmitting}
            label="Sign in"
            loadingLabel="Signing in"
          />

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              or continue with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex w-full flex-col items-center">
            <div className="flex min-h-11 w-full justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setGoogleError("Google sign-in failed. Please try again.");
                }}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
                width={300}
                logo_alignment="left"
              />
            </div>
          </div>
          {isGoogleSubmitting && (
            <p role="status" className="text-sm text-muted-foreground">
              Signing in with Google…
            </p>
          )}

          {googleError && (
            <p role="alert" className="text-center text-sm text-red-600">
              {googleError}
            </p>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
