import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Icons } from "../Icon";
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
import { EmailField } from "../form/EmailField";
import { PasswordField } from "../form/PasswordField";
import { SubmitButton } from "../form/SubmitButton";
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
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center">
            <Icons.logo aria-hidden="true" />
          </div>
          <span className="text-lg font-bold text-orange-500">Food Recipe</span>
        </div>

        <div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="mt-1">
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
                className="text-xs font-medium text-orange-600 underline"
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

          <div className="flex w-full flex-col items-center gap-3">
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

            <Button
              type="button"
              variant="outline"
              className="h-10 w-full max-w-75 gap-3 font-medium"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5 shrink-0 fill-[#1877F2]"
              >
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.931-1.956 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
              </svg>
              Continue with Facebook
            </Button>
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
              className="font-semibold text-orange-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
