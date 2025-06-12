import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";

import LandingLayout from "@/layouts/LandingLayout.jsx";
import AuthLayout from "@/layouts/AuthLayout.jsx";
import HomePage from "@/pages/Landing/HomePage.jsx";
import DocumentationPage from "@/pages/Landing/DocumentationPage.jsx";
import TeamPage from "@/pages/Landing/TeamPage.jsx";
import RegisterPage from "@/pages/Auth/RegisterPage.jsx";

export function App() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <Outlet />;
}

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "docs",
            element: <DocumentationPage />,
          },
          {
            path: "team",
            element: <TeamPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "signup",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
];
