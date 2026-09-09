import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Icons } from "../Icon";
import { Form } from "react-router-dom";

export function VerifyForm() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <Icons.logo aria-hidden="true" />
            <span className="ml-2 font-sans text-orange-500">Food Recipe</span>
          </div>
        </CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address
        </CardDescription>
      </CardHeader>
      <Form method="post">
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs" className="cursor-pointer">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <InputOTP maxLength={6} id="otp-verification" required>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer bg-orange-500"
            >
              Verify
            </Button>
          </Field>
        </CardContent>
      </Form>
    </Card>
  );
}
