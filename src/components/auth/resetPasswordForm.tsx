import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "../Icon";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { PasswordField } from "../form/PasswordField";
import { SubmitButton } from "../form/SubmitButton";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be between 8 and 72 characters")
      .max(72, "Password must be between 8 and 72 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export function ResetPasswordForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });
  const isSubmitting = navigation.state === "submitting";
  const onSubmit = (values: ResetFormValues) => {
    submit(values, { method: "post" });
  };
  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl shadow-orange-950/5">
      <CardHeader className="gap-5">
        <Link
          to="/register/verify-otp"
          className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to verification
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center">
              <Icons.logo aria-hidden="true" />
            </div>
            <span className="text-lg font-bold text-orange-500">
              Food Recipe
            </span>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription>
              Choose a strong password to finish reseting password.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-5">
            <PasswordField
              id="password"
              label="Password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <PasswordField
              id="confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              label="Reset Password"
              loadingLabel="Reseting Password"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
