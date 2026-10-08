import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../../../components/Icon";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import { PasswordField } from "../../../components/form/PasswordField";
import { SubmitButton } from "../../../components/form/SubmitButton";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

const registerSchema = z
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

type RegisterFormValues = z.infer<typeof registerSchema>;

export function ConfirmPasswordForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const isSubmitting = navigation.state === "submitting";
  const onSubmit = (values: RegisterFormValues) => {
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
            <CardTitle className="text-2xl">Create your password</CardTitle>
            <CardDescription>
              Choose a strong password to finish creating your account.
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
              label="Create account"
              loadingLabel="Creating account"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
