import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <>
      <AuthInitializer />
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-[#FAF9F6]">
        <nav
          aria-label="Main navigation"
          className="container mx-auto flex h-16 items-center px-4"
        >
          <MainNavigation />

          <div className="flex w-full items-center justify-between lg:hidden">
            <MobileNavigation />
          </div>
        </nav>
      </header>
    </>
  );
}
