import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "../../assets/food-recipe-logo.svg";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function closeOnDesktop() {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    }

    closeOnDesktop();
    mediaQuery.addEventListener("change", closeOnDesktop);

    return () => {
      mediaQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <Link to="/" className="flex shrink-0 items-center gap-1.5">
        <img src={logo} alt="" className="size-8 shrink-0" />

        <span className="text-lg font-bold tracking-tight text-orange-500">
          {siteConfig.name}
        </span>

        <span className="sr-only">Home</span>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="size-10" />}
        >
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Open navigation menu</span>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex w-[85vw] max-w-sm flex-col bg-[#FAF9F6]"
        >
          <SheetHeader className="px-6 pt-6">
            <SheetTitle className="flex items-center gap-1.5 text-orange-500">
              <img src={logo} alt="" className="size-8 shrink-0" />

              <span className="text-lg font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </SheetTitle>

            <SheetDescription className="sr-only">
              Browse recipes, explore cuisines, or sign in.
            </SheetDescription>
          </SheetHeader>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto px-6 py-4"
          >
            <ul className="space-y-2">
              {siteConfig.mainNav[0].menu.map((item) => (
                <li key={item.href}>
                  <SheetClose
                    render={<Link to={item.href} />}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-600"
                  >
                    {item.title}
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-stone-200 p-6">
            <SheetClose
              render={<Link to="/login" />}
              className={`${buttonVariants({ variant: "outline" })}
    min-h-11 w-full border-orange-500 bg-transparent
    text-orange-500 hover:bg-orange-50 hover:text-orange-600`}
            >
              Sign in
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
