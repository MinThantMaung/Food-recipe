import { Link } from "react-router-dom";
import logo from "../../assets/food-recipe-logo.svg";
import { siteConfig } from "@/config/site";

function Footer() {
  return (
    <footer className="w-full border-t border-stone-200">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-6 sm:flex-row sm:justify-between sm:py-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="size-8 shrink-0" />

          <div>
            <span className="text-base font-bold tracking-tight text-orange-500">
              {siteConfig.name}
            </span>

            <p className="mt-1 text-xs text-stone-500">
              {siteConfig.footerDescription}
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
            {siteConfig.footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-stone-500 transition-colors hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;