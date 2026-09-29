import { UpdateCountryForm } from "@/components/auth/UpdateCountryForm";
import registerBanner from "../../data/images/registerBanner.png"


function UpdateCountry() {
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
          <UpdateCountryForm />
        </div>
      </div>
    </main>
  );
}

export default UpdateCountry;
