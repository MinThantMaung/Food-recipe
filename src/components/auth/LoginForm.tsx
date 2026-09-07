import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../Icon";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground">
              <Icons.logo aria-hidden="true" />
              <span className="ml-2 font-sans text-orange-500">
                Food Recipe
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:text-orange-500"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-orange-500 cursor-pointer">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <Button variant="outline" className="w-full">
          Login with Facebook
        </Button>
      </CardFooter>
    </Card>
  );
}
