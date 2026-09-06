import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "Error",
    children: [
      { index: true, element: <Home />},
    ],
  }
]);
