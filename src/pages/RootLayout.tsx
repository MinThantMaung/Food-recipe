
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { cn } from "@/lib/utils";

function RootLayout() {
  const { pathname } = useLocation();
  const isPrivacyPage = pathname === "/privacy";

  return (
    <div
      className={cn(
        "flex flex-col bg-[#FAF9F6]",
        isPrivacyPage
          ? "h-dvh overflow-hidden"
          : "min-h-dvh"
      )}
    >
      <Header />

      <main
        className={cn(
          "mt-16 flex-1",
          isPrivacyPage && "min-h-0"
        )}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
