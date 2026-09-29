// src/components/form/SubmitButton.tsx
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
};

export function SubmitButton({
  isSubmitting,
  label,
  loadingLabel,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="h-11 w-full cursor-pointer bg-orange-500 font-semibold hover:bg-orange-600"
    >
      {isSubmitting ? (
        <>
          <LoaderCircle
            className="size-4 animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : (
        label
      )}
    </Button>
  );
}