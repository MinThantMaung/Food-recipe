// src/components/form/EmailField.tsx
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EmailFieldProps = Omit<ComponentPropsWithoutRef<typeof Input>, "type"> & {
  id: string;
  error?: string;
};

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  (
    {
      id,
      error,
      placeholder = "you@example.com",
      className = "",
      ...inputProps
    },
    ref,
  ) => {
    const errorId = `${id}-error`;

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>Email address</Label>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            {...inputProps}
            ref={ref}
            id={id}
            type="email"
            autoComplete="email"
            placeholder={placeholder}
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

EmailField.displayName = "EmailField";