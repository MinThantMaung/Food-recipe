import { CookingPot, LoaderCircle } from "lucide-react";

export default function InitialLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#FAF9F6] px-6"
    >
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-orange-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-amber-100/60 blur-3xl"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Animated brand icon */}
        <div
          aria-hidden="true"
          className="relative mb-10 flex size-32 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-orange-200/70" />

          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] motion-reduce:animate-none">
            <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 shadow-sm shadow-orange-200" />
          </div>

          <div className="absolute inset-3 rounded-full border border-dashed border-orange-200/80" />

          <div className="flex size-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-orange-900/5 ring-1 ring-orange-100">
            <CookingPot
              strokeWidth={1.6}
              className="size-10 text-orange-500"
            />
          </div>
        </div>

        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          Food Recipe
        </span>

        <h1 className="text-2xl font-semibold tracking-tight text-stone-800 sm:text-3xl">
          Something delicious
          <br />
          is on its way.
        </h1>

        <p className="mt-4 max-w-64 text-sm leading-relaxed text-stone-500">
          Getting your recipes ready for your next kitchen adventure.
        </p>

        <div className="mt-8 flex items-center gap-2.5 rounded-full border border-orange-100 bg-white/80 px-4 py-2">
          <LoaderCircle
            aria-hidden="true"
            className="size-3.5 animate-spin text-orange-500 motion-reduce:animate-none"
          />
          <span className="text-xs font-medium text-stone-500">
            Preparing your table…
          </span>
        </div>
      </div>
    </div>
  );
}