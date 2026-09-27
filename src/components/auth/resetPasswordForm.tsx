import { ArrowLeft, Mail } from "lucide-react";
import { Link, Form, useNavigation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../Icon";

export function ResetPasswordForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card className="w-full max-w-sm border-orange-100 shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Icons.logo aria-hidden="true" />
          <span className="font-sans font-semibold text-orange-500">
            Food Recipe
          </span>
        </div>

        <div className="space-y-1">
          <CardDescription>
            Enter your email and we will send you a link to reset it.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <Form method="post" className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="pl-9"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </Button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:cursor-pointer hover:text-orange-500"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </Form>
      </CardContent>
    </Card>
  );
}