import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";

import LandingLayout from "@/layouts/LandingLayout.jsx";
import AuthLayout from "@/layouts/AuthLayout.jsx";
import HomePage from "@/pages/Landing/HomePage.jsx";
import DocumentationPage from "@/pages/Landing/DocumentationPage.jsx";
import TeamPage from "@/pages/Landing/TeamPage.jsx";
import RegisterPage from "@/pages/Auth/RegisterPage.jsx";
import LoginPage from "@/pages/Auth/LoginPage.jsx";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage.jsx";
import NotFoundPage from "@/pages/Error/NotFoundPage.jsx";
import InternalServerErrorPage from "@/pages/Error/InternalServerErrorPage.jsx";
import ServiceUnavailablePage from "@/pages/Error/ServiceUnavailablePage.jsx";
import UnauthorizedPage from "@/pages/Error/UnauthorizedPage.jsx";
import ForbiddenPage from "@/pages/Error/ForbiddenPage.jsx";
import GenericErrorPage from "@/pages/Error/GenericErrorPage.jsx";

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
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "password-reset/:token",
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        path: "error-401",
        element: <UnauthorizedPage />,
      },
      {
        path: "error-403",
        element: <ForbiddenPage />,
      },
      {
        path: "error-500",
        element: <InternalServerErrorPage />,
      },
      {
        path: "error-503",
        element: <ServiceUnavailablePage />,
      },
      {
        path: "error-generic",
        element: <GenericErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
