import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/Login.tsx"
import RegisterPage from "./pages/auth/Register.tsx"

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
  }
]);
