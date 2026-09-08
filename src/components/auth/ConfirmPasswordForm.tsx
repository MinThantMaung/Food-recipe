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
import { useNavigate } from "react-router-dom";

export function ConfirmPasswordForm() {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate("/");
  };
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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="12345Password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">ConfirmPassword</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="12345Password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-orange-500 cursor-pointer"
          onClick={handleConfirm}
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
