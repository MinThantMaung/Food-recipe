import { LoaderCircle } from "lucide-react";

export default function InitialLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#FAF9F6]"
    >
      <LoaderCircle
        aria-hidden="true"
        className="size-10 animate-spin text-orange-500 motion-reduce:animate-none"
      />

      <p className="text-sm text-muted-foreground">
        Getting your recipes ready…
      </p>
    </div>
  );
}