// src/components/form/PasswordField.tsx
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { LockKeyhole } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordFieldProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  "type"
> & {
  id: string;
  label: string;
  error?: string;
  labelAction?: ReactNode;
};

export const PasswordField = forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(
  (
    {
      id,
      label,
      error,
      labelAction,
      className = "",
      autoComplete = "new-password",
      ...inputProps
    },
    ref,
  ) => {
    const errorId = `${id}-error`;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={id}>{label}</Label>
          {labelAction}
        </div>

        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            {...inputProps}
            ref={ref}
            id={id}
            type="password"
            autoComplete={autoComplete}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`h-11 pl-10 ${className}`}
          />
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";