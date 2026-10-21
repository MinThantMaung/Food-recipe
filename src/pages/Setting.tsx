import { ProfileBanner } from "@/features/recipes/components/ProfileBanner";
import banner from "../assets/profileBanner.png";
import { AccountInformation } from "@/features/recipes/components/setting/AccountInformation";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "@/components/form/PasswordField";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { AccountActions } from "@/features/recipes/components/setting/AccountActions";
import { useDeleteUser, userProfileQuery, useUpdatePassword } from "@/api/useUser";
import type { UpdatePasswordInput } from "@/api/user";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";
import { SignInMethod } from "@/features/setting/SignInmethod";
import { useSuspenseQuery } from "@tanstack/react-query";

const resetSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    password: z
      .string()
      .min(8, "Password must be between 8 and 72 characters")
      .max(72, "Password must be between 8 and 72 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function Setting() {

  const { data: userDetail } = useSuspenseQuery(userProfileQuery());

  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ResetFormValues>({
  resolver: zodResolver(resetSchema),
  defaultValues: {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  },
});

  const onPhoneChange = () => {};
  const { mutate, isPending } = useUpdatePassword();
  const { mutate: deleteUserMutate, isPending: isPendingDeleteUser } =
    useDeleteUser();

  const onSubmit = (data: UpdatePasswordInput) => {
    mutate(
      {
        currentPassword: data.currentPassword,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset()
          toast.add({
            title: "Update Success!",
            description: "Password Successfully updated.",
            type: "success",
          });
        },
        onError: (error) => {
          const message = axios.isAxiosError<{ message: string }>(error)
            ? error.response?.data?.message
            : undefined;
          toast.add({
            title: "Error",
            description:
              message || "Unable to update password. Please try again.",
            type: "error",
          });
        },
      }
    );
  };

  const onDeleteAccount = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        useAuthUserStore.setState({ user: null });
        toast.add({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
          type: "success",
        });
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        const message = axios.isAxiosError<{ message: string }>(error)
          ? error.response?.data?.message
          : undefined;

        toast.add({
          title: "Unable to delete account",
          description: message || "Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="mx-auto h-full min-h-0 w-full max-w-6xl px-4 sm:p-6 lg:p-8">
      <ProfileBanner
        title="Settings"
        imageUrl={banner}
        description="Manage your account preferences and security settings"
      />
      <AccountInformation
        userDetail={userDetail}
        onPhoneChange={onPhoneChange}
      />

      {userDetail.password ? (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your password to keep your accout secure.
                </p>
              </div>

              <PasswordField
                id="currentPassword"
                label="Current Password"
                autoComplete="current-password"
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />

              <div className="space-y-1 md:space-y-2">
                <PasswordField
                  id="password"
                  label="New Password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  {...register("password")}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Use at least 8 characters with a mix of
                  uppercase,lowercase,numbers and symnbols.
                </p>
              </div>

              <PasswordField
                id="confirmPassword"
                label="Confirm password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer bg-orange-500 px-6 font-semibold hover:bg-orange-600 sm:w-auto"
                >
                  {isPending ? (
                    <>
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Update Password</span>
                    </>
                  ) : (
                    "Update password"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <SignInMethod email={userDetail.email} />
      )}
      <AccountActions
        onDeleteAccount={onDeleteAccount}
        isDeleting={isPendingDeleteUser}
      />
    </div>
  );
}
