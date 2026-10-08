import { ArrowLeft, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Icons } from "../../../components/Icon";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import useAuthStore, { Status } from "@/features/auth/stores/authStore";
import { useEffect, useState } from "react";
import { resendOtp } from "@/api/resendOtp";
import axios from "axios";
import { toast } from "../../../components/ui/toast";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "../../../components/form/SubmitButton";

const verifySchema = z.object({
  otp: z
    .string()
    .min(1, { error: "Verification code is required" })
    .regex(/^\d{6}$/, {
      error: "Enter a 6-digit verification code",
    }),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export function VerifyForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [isResending, setIsResending] = useState<boolean>(false);
  const { email, token, setAuth } = useAuthStore.getState();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as { error?: string } | undefined;
  const [resendAvailableAt, setResendAvailableAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  const cooldownSeconds = Math.max(
    0,
    Math.ceil((resendAvailableAt - now) / 1000),
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (resendAvailableAt <= Date.now()) return;

    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);

      if (currentTime >= resendAvailableAt) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);

  const otpError = errors.otp?.message ?? actionData?.error;

  const onSubmit = (values: VerifyFormValues) => {
    submit({ otp: values.otp, email, token }, { method: "post" });
  };
  const resendEmail = async () => {
    setIsResending(true);

    try {
      const data = await resendOtp(email, token);

      if (data.token) {
        setAuth(email, data.token, Status.otp);
      }

      const currentTime = Date.now();
      setNow(currentTime);
      setResendAvailableAt(currentTime + 60 * 1000);

      toast.add({
        title: "A new code was sent.",
        description: data.message ?? "A new verification code was sent.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Error",
        description: axios.isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? "Could not resend the code.")
          : "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };
  return (
    <Card className="mx-auto w-full max-w-md border-border/60 shadow-xl shadow-orange-950/5">
      <CardHeader className="gap-5">
        <Link
          to="/register"
          className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to registration
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
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              Enter the 6-digit code we sent to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="otp-verification" className="text-sm font-medium">
                Verification code
              </label>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resendEmail}
                disabled={isResending || isSubmitting || cooldownSeconds > 0}
                className="h-8 cursor-pointer px-2 text-orange-600 hover:text-orange-700"
              >
                <RefreshCwIcon
                  className={`size-4 ${isResending ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />

                {isResending
                  ? "Resending..."
                  : cooldownSeconds > 0
                    ? `Resend in ${cooldownSeconds}s`
                    : "Resend code"}
              </Button>
            </div>

            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <div className="flex justify-center">
                  <InputOTP
                    id="otp-verification"
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputMode="numeric"
                    pattern="^[0-9]+$"
                    aria-invalid={!!errors.otp}
                    aria-describedby={errors.otp ? "otp-error" : undefined}
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl sm:*:data-[slot=input-otp-slot]:w-11">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator className="mx-1 sm:mx-2" />

                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl sm:*:data-[slot=input-otp-slot]:w-11">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            />

            {otpError && (
              <p
                id="otp-error"
                role="alert"
                className="text-center text-sm text-destructive"
              >
                {otpError}
              </p>
            )}
          </div>

          <SubmitButton
            isSubmitting={isSubmitting}
            label="Verify email"
            loadingLabel="Verifying email"
          />
        </form>
      </CardContent>
    </Card>
  );
}
