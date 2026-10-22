import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import { ArrowLeft, House, RefreshCw, UtensilsCrossed } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const status = isRouteErrorResponse(error)
    ? error.status
    : null;

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 py-16">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-orange-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-amber-100/60 blur-3xl"
      />

      <div className="relative w-full max-w-lg text-center">
        <a
          href="/"
          className="mb-12 inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          aria-label="Food Recipe home"
        >
          <img src="/favicon.svg" alt="" className="size-9" />
          <span className="text-sm font-semibold tracking-wide text-stone-800">
            Food Recipe
          </span>
        </a>

        <div
          aria-hidden="true"
          className="relative mx-auto mb-8 flex size-32 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-orange-200/70" />
          <div className="absolute inset-3 rounded-full border border-dashed border-orange-200" />

          <div className="flex size-20 -rotate-6 items-center justify-center rounded-3xl bg-white shadow-xl shadow-orange-900/5 ring-1 ring-orange-100">
            <UtensilsCrossed
              strokeWidth={1.5}
              className="size-9 text-orange-500"
            />
          </div>
        </div>

        <span className="inline-flex rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-700">
          {isNotFound
            ? "404 · Page not found"
            : status
              ? `${status} · Something went wrong`
              : "Something went wrong"}
        </span>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl">
          {isNotFound
            ? "This page is off the menu."
            : "A little kitchen mishap."}
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-stone-500 sm:text-base">
          {isNotFound
            ? "We couldn’t find the page you’re looking for. Let’s get you back to something delicious."
            : "We couldn’t load this page. Please try again, or head home to explore more recipes."}
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          >
            <House aria-hidden="true" className="size-4" />
            Back to home
          </a>

          {!isNotFound && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Try again
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-stone-500 transition-colors hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Go back
        </button>
      </div>
    </main>
  );
}