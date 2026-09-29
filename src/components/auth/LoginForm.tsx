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

  const handleLogin = (data: LoginFormValues) => {
    submit(data, { method: "post", action: "/login" });
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

          <div className="grid w-full grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-11">
              Google
            </Button>
            <Button type="button" variant="outline" className="h-11">
              Facebook
            </Button>
          </div>

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
