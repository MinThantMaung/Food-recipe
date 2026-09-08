import { RegisterForm } from "@/components/auth/RegisterForm";
import registerBanner from "../../data/images/registerBanner.png";

function Register() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${registerBanner})`,
        }}
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Register form */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}

export default Register;