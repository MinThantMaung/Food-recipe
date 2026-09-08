import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/Login.tsx"
import RegisterPage from "./pages/auth/Register.tsx"
import VerifyOtpPage from "./pages/auth/VerifyOtp.tsx";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "Error",
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "/login", element: <LoginPage />
  },
  {
    path: "/register", element: <RegisterPage />
  },
  {
    path: "/verify-otp", element: <VerifyOtpPage />
  },
  {
    path: "/confirm-password", element: <ConfirmPasswordPage />
  }
]);
