import { createBrowserRouter, redirect } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";

import {
  confirmPasswordAction,
  forgotPasswordAction,
  loginAction,
  logoutAction,
  registerAction,
  resetPasswordAction,
  verifyOtpAction,
  verifyOtpPasswordAction,
} from "./router/action/index.ts";

import {
  confirmLoader,
  cuisinesLoader,
  homeLoader,
  loginLoader,
  otpLoader,
  profileLoader,
  recipesDetailLoader,
  recipesLoader,
  savedRecipesLoader,
  settingLoader,
} from "./router/loader/index.ts";
import InitialLoading from "./utils/InitialLoading.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <InitialLoading />,
    errorElement: "Error",
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "recipes",
        loader: recipesLoader,
        lazy: async () => {
          const mod = await import("./pages/Recipes.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "recipes/:recipeId",
        loader: recipesDetailLoader,
        lazy: async () => {
          const mod = await import("./pages/RecipeDeatil.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "cuisines",
        loader: cuisinesLoader,
        lazy: async () => {
          const mod = await import("./pages/Cuisines.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const mod = await import("./pages/About.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "privacy",
        lazy: async () => {
          const mod = await import("./pages/Privacy.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const mod = await import("./pages/Contact.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "profile",
        loader: profileLoader,
        lazy: async () => {
          const mod = await import("./pages/Profile.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "setting",
        loader: settingLoader,
        lazy: async () => {
          const mod = await import("./pages/Setting.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "save",
        loader: savedRecipesLoader,
        lazy: async () => {
          const mod = await import("./pages/SavedRecipe.tsx");
          return { Component: mod.default };
        },
      },
    ],
  },
  {
    path: "/login",
    loader: loginLoader,
    action: loginAction,
    lazy: async () => {
      const mod = await import("./pages/auth/Login.tsx");
      return { Component: mod.default };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const mod = await import("./pages/AuthRootLayout.tsx");
      return { Component: mod.default };
    },
    children: [
      {
        index: true,
        loader: loginLoader,
        action: registerAction,
        lazy: async () => {
          const mod = await import("./pages/auth/Register.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "verify-otp",
        loader: otpLoader,
        action: verifyOtpAction,
        lazy: async () => {
          const mod = await import("./pages/auth/VerifyOtp.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "confirm-password",
        loader: confirmLoader,
        action: confirmPasswordAction,
        lazy: async () => {
          const mod = await import("./pages/auth/ConfirmPassword.tsx");
          return { Component: mod.default };
        },
      },
    ],
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const mod = await import("./pages/AuthRootLayout.tsx");
      return { Component: mod.default };
    },
    children: [
      {
        index: true,
        loader: loginLoader,
        action: forgotPasswordAction,
        lazy: async () => {
          const mod = await import("./pages/auth/ForgotPassword.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "verify",
        loader: otpLoader,
        action: verifyOtpPasswordAction,
        lazy: async () => {
          const mod = await import("./pages/auth/VerifyOtp.tsx");
          return { Component: mod.default };
        },
      },
      {
        path: "reset-password",
        loader: confirmLoader,
        action: resetPasswordAction,
        lazy: async () => {
          const mod = await import("./pages/auth/ResetPassword.tsx");
          return { Component: mod.default };
        },
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);