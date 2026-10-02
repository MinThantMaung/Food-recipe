import { Link } from "react-router-dom";
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

export default function MainNavigation() {
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
            {siteConfig.mainNav[0].menu.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link to={item.href} />}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

      <Link
        to="/login"
        className={`${buttonVariants({ variant: "outline" })}
          border-orange-500 bg-transparent text-orange-500
           hover:bg-orange-50 hover:text-orange-600`}
      >
        Sign in
      </Link>
    </div>
  );
}