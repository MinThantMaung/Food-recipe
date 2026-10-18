import { LockKeyhole } from "lucide-react";

type SignInMethodProps = {
  email: string;
};

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="size-11 shrink-0"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 32 14.9l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32 14.9l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4 5.6l6.2 5.2A20 20 0 0 0 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

export function SignInMethod({ email }: SignInMethodProps) {
  return (
    <section
      aria-labelledby="sign-in-method-heading"
      className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7"
    >
      <h2
        id="sign-in-method-heading"
        className="text-xl font-semibold tracking-tight text-gray-950"
      >
        Sign-in method
      </h2>

      <div className="mt-6 rounded-xl border border-gray-200 p-4 sm:p-5">
        <div className="flex items-center gap-4 sm:gap-6">
          <GoogleIcon />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-lg font-semibold text-gray-950">
                Google
              </h3>

              <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Connected
              </span>
            </div>

            <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-lg bg-gray-100 p-4 sm:items-center sm:p-5">
          <LockKeyhole
            aria-hidden="true"
            className="mt-0.5 size-6 shrink-0 text-gray-950 sm:mt-0"
            strokeWidth={1.8}
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              You sign in with Google.
            </p>

            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Your Google password is managed through your Google Account.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-500">
        You haven&apos;t set a password for your Food Recipe account.
      </p>
    </section>
  );
}