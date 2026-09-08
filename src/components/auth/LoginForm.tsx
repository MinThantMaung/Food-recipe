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
import { Link } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    .min(6, "Password must be at least 6 characters"),
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

  const handleLogin = (data: LoginFormValues) => {
    console.log("Login data:", data);

    // call login API here later
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

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="food@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  Password
                </Label>

                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:text-orange-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
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
            className="w-full cursor-pointer bg-orange-500"
          >
            Login
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
          >
            Login with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
          >
            Login with Facebook
          </Button>

          <div>
            <span className="text-xs">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="text-xs text-orange-500 underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
      {/* FORM ENDS HERE */}
    </Card>
  );
}