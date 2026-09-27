import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toast";

export default function AuthRootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}