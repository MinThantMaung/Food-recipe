import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AuthRootLayout from "./pages/AuthRootLayout.tsx";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/Login.tsx"
import RegisterPage from "./pages/auth/Register.tsx"
import VerifyOtpPage from "./pages/auth/VerifyOtp.tsx";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword.tsx";
import { confirmPasswordAction, registerAction, verifyOtpAction } from "./router/action/index.ts";

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
    path: "/register", 
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
        action: verifyOtpAction
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />,
        action: confirmPasswordAction
      }
    ]
  },
]);
