import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "./routes";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!googleClientId) {
  throw new Error("VITE_GOOGLE_CLIENT_ID is required");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
