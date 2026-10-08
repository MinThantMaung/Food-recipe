import { Form, Link, useLocation } from "react-router-dom";
import logo from "../../assets/food-recipe-logo.svg";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";

export default function MainNavigation() {
  const { pathname } = useLocation();

  const user = useAuthUserStore((state) => state.user);
  const status = useAuthUserStore((state) => state.status);

  return (
    <div className="hidden w-full items-center justify-between lg:flex">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex shrink-0 items-center gap-1.5">
          <img src={logo} alt="" className="size-8 shrink-0" />

          <span className="text-lg font-bold tracking-tight text-orange-500">
            {siteConfig.name}
          </span>

          <span className="sr-only">Home</span>
        </Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.mainNav[0].menu.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/recipes" && pathname.startsWith("/recipes/"));

            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  active={isActive}
                  render={<Link to={item.href} />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-colors",
                    isActive
                      ? "bg-orange-! text-orange-600! font-semibold"
                      : "text-gray-700 hover:bg-orange-! hover:text-orange-500!",
                  )}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {status === "loading" ? (
        <div className="size-9 animate-pulse rounded-full bg-gray-100" />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user.image} alt="shadcn" />
                  <AvatarFallback>
                    {user.username?.trim().charAt(0).toUpperCase() || "F"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link to="/setting">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Form method="post" action="/logout">
                <DropdownMenuItem
                  variant="destructive"
                  nativeButton
                  render={<button type="submit" className="w-full text-left" />}
                >
                  Logout
                </DropdownMenuItem>
              </Form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-orange-500 text-orange-500",
          )}
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
