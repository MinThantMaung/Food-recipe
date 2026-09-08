import registerBanner from "../../data/images/registerBanner.png";
import { ConfirmPasswordForm } from "@/components/auth/ConfirmPasswordForm";

function ConfirmPassword() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${registerBanner})`,
        }}
      />

      <div className="relative z-10 flex min-h-dvh items-center justify-center">
        <div className="w-full max-w-sm">
          <ConfirmPasswordForm />
        </div>
      </div>
    </main>
  );
}

export default ConfirmPassword;