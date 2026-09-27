import registerBanner from "../../data/images/registerBanner.png"
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";


function resetPassword() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${registerBanner})`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* ResetPassword form */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center">
        <div className="w-full max-w-sm">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}

export default resetPassword;
