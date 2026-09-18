import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground">
              <Icons.logo aria-hidden="true" />

              <span className="ml-2 font-sans text-orange-500">
                Food Recipe
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      {/* FORM STARTS HERE */}
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <CardContent>
          <div className="flex flex-col gap-6">
            {actionData?.error && (
              <div role="alert" className="text-sm text-red-600">
                {actionData.error}
              </div>
            )}
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="food@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-orange-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-orange-500"
          >
            {isSubmitting ? "Logging in..." : "Login"}{" "}
          </Button>

          <Button type="button" variant="outline" className="w-full">
            Login with Google
          </Button>

          <Button type="button" variant="outline" className="w-full">
            Login with Facebook
          </Button>

          <div>
            <span className="text-xs">Don't have an account?</span>

            <Link to="/register" className="text-xs text-orange-500 underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
