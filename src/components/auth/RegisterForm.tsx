import {
  Card,
  CardContent,
  CardDescription,
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
import { ArrowLeft } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailField } from "../form/EmailField";
import { SubmitButton } from "../form/SubmitButton";

const registerSchema = z.object({
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

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as { error?: string } | undefined;

  const onSubmit = (values: RegisterFormValues) => {
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
              Create your account
            </CardTitle>
            <CardDescription>
              Enter your email address and we’ll send you a verification code to
              get started.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
