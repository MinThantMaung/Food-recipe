import { ArrowLeft } from "lucide-react";
import {
  Link,
  useNavigation,
  useActionData,
  useSubmit,
} from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "../Icon";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "../form/EmailField";
import { SubmitButton } from "../form/SubmitButton";

const forgotPasswordSchema = z.object({
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
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const actionData = useActionData() as { error?: string } | undefined;

  const onSubmit = (values: ForgotPasswordFormValues) => {
    submit(values, { method: "post" });
  };
  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl shadow-orange-950/5">
      <CardHeader className="gap-5">
        <Link
          to="/login"
          className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to login
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icons.logo aria-hidden="true" />
            <span className="font-semibold text-orange-500">Food Recipe</span>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Reset Your Password
            </CardTitle>
            <CardDescription>
              Enter your email and we will send you a link to reset it.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <EmailField
              id="email"
              error={errors.email?.message}
              {...register("email")}
            />

            {actionData?.error && (
              <p role="alert" className="text-sm text-destructive">
                {actionData.error}
              </p>
            )}
          </div>

          <SubmitButton
            isSubmitting={isSubmitting}
            label="Send verification code"
            loadingLabel="Sending verification code"
          />
        </form>
      </CardContent>
    </Card>
  );
}
