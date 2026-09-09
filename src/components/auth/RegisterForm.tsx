import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../Icon";
import { Form } from "react-router-dom";

export function RegisterForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="space-y-2">
          <div className="flex items-center">
            <Icons.logo aria-hidden="true" />
            <span className="ml-2 font-sans text-orange-500">Food Recipe</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="food@example.com"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 cursor-pointer"
            >
              Register
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
