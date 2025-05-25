import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";

import Landing from "@/pages/Landing";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import DashboardHomePage from "@/pages/dashboard/DashboardHomePage";
import DashboardInboxPage from "@/pages/dashboard/DashboardInboxPage";
import DashboardMyTasksPage from "@/pages/dashboard/DashboardMyTasksPage";
import DashboardProjectsPage from "@/pages/dashboard/DashboardProjectsPage";
import DashboardProjectPage from "@/pages/dashboard/DashboardProjectPage";
import NotFound from "@/pages/NotFound";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

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
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "password-reset/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <DashboardHomePage />,
                handle: { title: "Inicio" },
              },
              {
                path: "inbox",
                element: <DashboardInboxPage />,
                handle: { title: "Bandeja de Entrada" },
              },
              {
                path: "my-tasks",
                element: <DashboardMyTasksPage />,
                handle: { title: "Tareas" },
              },
              {
                path: "projects",
                element: <DashboardProjectsPage />,
                handle: { title: "Proyectos" },
              },
              {
                path: "projects/:projectId",
                element: <DashboardProjectPage />,
                handle: { title: "Detalles del Proyecto" },
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
