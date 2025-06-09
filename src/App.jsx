import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";

import HomePage from '@/pages/Landing/HomePage.jsx';
import LandingLayout from '@/layouts/LandingLayout.jsx';

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
        ],
      },
    ],
  },
];
