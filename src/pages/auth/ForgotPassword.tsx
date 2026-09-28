import registerBanner from "../../data/images/registerBanner.png"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";


function ForgotPassword() {
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
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
