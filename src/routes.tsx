import { createBrowserRouter, redirect } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AuthRootLayout from "./pages/AuthRootLayout.tsx";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/Login.tsx"
import RegisterPage from "./pages/auth/Register.tsx"
import VerifyOtpPage from "./pages/auth/VerifyOtp.tsx";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword.tsx";
import { confirmPasswordAction, loginAction, logoutAction, registerAction, verifyOtpAction } from "./router/action/index.ts";
import { confirmLoader, homeLoader, loginLoader, otpLoader } from "./router/loader/index.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "Error",
    children: [
      { index: true, element: <Home />,loader: homeLoader },
    ],
  },
  {
    path: "/login", element: <LoginPage />,
    loader: loginLoader,
    action: loginAction
  },
  {
    path: "/register", 
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
        loader: loginLoader,
        action: registerAction
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
        loader: otpLoader,
        action: verifyOtpAction
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />,
        loader: confirmLoader,
        action: confirmPasswordAction
      }
    ]
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);
